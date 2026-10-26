ALTER TABLE "Item"
ADD COLUMN IF NOT EXISTS "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

DO $$
BEGIN
  IF to_regclass('"ItemTag"') IS NOT NULL AND to_regclass('"Tag"') IS NOT NULL THEN
    UPDATE "Item" AS item
    SET "tags" = ARRAY(
      SELECT DISTINCT tag_name
      FROM unnest(
        COALESCE(item."tags", ARRAY[]::TEXT[]) ||
        COALESCE(
          (
            SELECT array_agg(tag."name")
            FROM "ItemTag" AS item_tag
            JOIN "Tag" AS tag ON tag."id" = item_tag."tagId"
            WHERE item_tag."itemId" = item."id"
          ),
          ARRAY[]::TEXT[]
        )
      ) AS tag_values(tag_name)
      ORDER BY tag_name
    );
  END IF;
END $$;

DROP TABLE IF EXISTS "ItemTag";
DROP TABLE IF EXISTS "Tag";

CREATE INDEX IF NOT EXISTS "item_tags_gin_idx"
ON "Item" USING GIN ("tags");

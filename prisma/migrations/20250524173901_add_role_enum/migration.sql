
CREATE TYPE "Role" AS ENUM ('guest', 'photographer', 'admin');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'guest';

CREATE TABLE "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "file" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"link" varchar NOT NULL,
	"category" char(50) NOT NULL,
	"file_type" varchar(16) NOT NULL,
	"section" char(1) NOT NULL,
	"semester" integer NOT NULL,
	"year" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "google-classroom" (
	"id" serial PRIMARY KEY NOT NULL,
	"course" varchar(300) NOT NULL,
	"code" varchar NOT NULL,
	"instructor" char(30) NOT NULL,
	"section" char(1) NOT NULL,
	"semester" integer NOT NULL,
	"year" integer NOT NULL,
	"subject" char(30) NOT NULL,
	"old" boolean DEFAULT false NOT NULL,
	"lab" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "google-classroom_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "subject" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(30),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updated_at" SET DEFAULT now();
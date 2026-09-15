# Empty S3 prefixes so the Console shows the course tree.
# Matches slugs and module counts in revenue-ripple/src/data/courses.js.
# Does not create intro.mp4 / module-N.mp4 — upload those with aws s3 cp.
# `courses/` already exists in the bucket; it is not managed here.

locals {
  course_slugs = toset([
    "email-marketing",
    "geo-targeting",
    "banner-ads",
    "ads",
    "lead-generation",
    "linkedin-ads",
    "messenger-marketing",
    "newsfeed-ads",
    "paid-traffic",
    "pinterest-marketing",
    "search-ads",
    "social-media-marketing",
    "twitter-ads",
    "automation",
    "website-design",
    "seo",
    "funnel-building",
    "outsourcing",
    "landing-pages",
    "affiliate-marketing",
    "ecommerce",
    "freelancing",
    "split-testing",
    "cold-calling",
    "affiliate-recruiting",
    "online-learning",
    "entrepreneurial-brainstorming",
    "ai-essentials",
    "ai-agent-fundamentals",
    "prompt-engineering",
    "mindset-mastery",
    "shoestring-startups",
  ])

  prefix_keys = concat(
    [for slug in local.course_slugs : "courses/${slug}/"],
    [
      "marketing/",
      "marketing/thank-you/",
      "marketing/dfy-funnel-offer/",
    ]
  )
}

resource "aws_s3_object" "video_prefixes" {
  for_each = toset(local.prefix_keys)

  bucket       = module.video_cdn.s3_bucket_name
  key          = each.value
  content      = ""
  content_type = "application/x-directory"
}

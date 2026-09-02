export const STATUS_CYCLE = ['not-started', 'in-progress', 'done']

export const STATUS_LABELS = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Done',
}

export const CATEGORY_CLASS = {
  Cert: 'cat-cert',
  Code: 'cat-code',
  Tools: 'cat-tools',
  Project: 'cat-project',
  Domain: 'cat-domain',
}

export const PHASES = [
  {
    id: 'phase-1',
    number: '01',
    shortLabel: 'SAA',
    title: 'AWS Solutions Architect Associate',
    subtitle: 'SAA-C03 · Passed in 2 months · Foundation certified',
    salaryRange: '$65,000 – $78,000',
    location: 'Junior Cloud / Infrastructure Engineer',
    jump: '+$22–35k vs today',
    roles: [
      'Junior Cloud Engineer',
      'IT Operations Engineer',
      'Infrastructure Technician',
      'Cloud Support Engineer',
    ],
    skills: [
      {
        id: 'p1-saa-cert',
        category: 'Cert',
        name: 'AWS SAA-C03',
        summary: 'Architecture design, service selection, cost optimization',
        defaultStatus: 'done',
        notes:
          'You already passed this. Keep it warm by mapping every new Terraform resource back to an SAA domain: resilient architectures, secure applications, high-performing architectures, and cost-optimized architectures. Use this cert as the vocabulary layer for interviews.',
        resources: [
          { label: 'SAA-C03 exam guide', href: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
          { label: 'AWS Well-Architected Framework', href: 'https://aws.amazon.com/architecture/well-architected/' },
        ],
        actions: [
          'Rewrite one production architecture (binGone or this lab) as a Well-Architected one-pager',
          'Quiz yourself: pick a service and name the cheaper or more resilient alternative',
        ],
      },
      {
        id: 'p1-epic-ehr',
        category: 'Domain',
        name: 'Epic EHR Deployment',
        summary: 'Northwell — live clinical environment',
        defaultStatus: 'done',
        notes:
          'This is the differentiator most cloud candidates cannot copy. Be able to explain how Epic lands on infrastructure: environments (POC, test, prod), downtime windows, identity, and why PHI cannot sit on a public subnet. Practice translating clinical constraints into AWS controls.',
        resources: [
          { label: 'HIPAA Security Rule overview', href: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html' },
          { label: 'AWS HIPAA eligible services', href: 'https://aws.amazon.com/compliance/hipaa-eligible-services-reference/' },
        ],
        actions: [
          'Write a 5-bullet story: a change you saw in Epic go-live and the infra risk it created',
          'List which AWS services in this repo would be in or out of a BAA',
        ],
      },
      {
        id: 'p1-aws-core',
        category: 'Tools',
        name: 'AWS Core Services',
        summary: 'EC2, S3, RDS, IAM, VPC, CloudFront, Route 53',
        defaultStatus: 'done',
        notes:
          'Treat this stack as muscle memory, not trivia. You should be able to draw a VPC with public/private subnets, an ALB, EC2, and RDS — which is exactly what this repo provisions — and explain why RDS is private and the ALB is public.',
        resources: [
          { label: 'VPC user guide', href: 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html' },
          { label: 'EC2 user guide', href: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html' },
          { label: 'RDS user guide', href: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html' },
        ],
        actions: [
          'Trace traffic in this repo: internet → ALB SG → EC2 SG → RDS SG',
          'Name one IAM mistake that would expose the RDS password in user data',
        ],
      },
      {
        id: 'p1-prod-apps',
        category: 'Project',
        name: 'Production Apps',
        summary: 'binGone + Revenue Ripple — built and shipped',
        defaultStatus: 'done',
        notes:
          'Shipped product is interview gold. Document architecture, the hardest outage or deploy, and what you would rebuild with Terraform. Keep screenshots, URLs, and a 60-second walkthrough ready. Do not undersell that these are real users, not tutorials.',
        resources: [
          { label: 'How to talk about projects', href: 'https://www.amazon.jobs/content/en/how-we-hire/interview-loop' },
        ],
        actions: [
          'Write a STAR story for one production incident or launch crunch',
          'List 3 things you would change if you rebuilt the infra in Terraform',
        ],
      },
      {
        id: 'p1-linux',
        category: 'Tools',
        name: 'Linux basics',
        summary: 'CLI, SSH, permissions, file system',
        defaultStatus: 'done',
        notes:
          'Cloud work is still a Linux job. Be fluent in ssh, chmod, journalctl/systemctl, reading nginx logs, and editing files without a GUI. On Amazon Linux 2023 that means dnf, systemd, and knowing where nginx writes its html root.',
        resources: [
          { label: 'Linux command primer', href: 'https://ubuntu.com/tutorials/command-line-for-beginners' },
          { label: 'systemd basics', href: 'https://www.freedesktop.org/software/systemd/man/latest/systemctl.html' },
        ],
        actions: [
          'SSH into a lab instance and confirm nginx is active with systemctl status',
          'Practice: find a file, change permissions, and tail a log without leaving the terminal',
        ],
      },
      {
        id: 'p1-qa',
        category: 'Domain',
        name: 'QA Engineering',
        summary: 'SDLC, test methodology, system validation',
        defaultStatus: 'done',
        notes:
          'QA background is how you talk about change control in healthcare. Frame Terraform apply as a tested change: plan is the review artifact, apply is the release, destroy is rollback. Interviewers in hospitals care that you will not YOLO prod.',
        resources: [
          { label: 'Terraform plan as a review artifact', href: 'https://developer.hashicorp.com/terraform/cli/commands/plan' },
        ],
        actions: [
          'Write a mini test plan for this stack: what you check after apply (ALB 200, RDS not public)',
          'Map one QA concept (regression, smoke test) onto an AWS health check',
        ],
      },
    ],
  },
  {
    id: 'phase-2',
    number: '02',
    shortLabel: 'Terraform',
    title: 'HashiCorp Terraform Associate',
    subtitle: '003 · Est. 2–3 weeks · Infrastructure as code',
    salaryRange: '$78,000 – $95,000',
    location: 'Mid Cloud / DevOps Engineer',
    jump: '+$35–52k vs today',
    roles: [
      'DevOps Engineer (Jr)',
      'Cloud Engineer',
      'Systems Administrator',
      'Infrastructure Engineer',
    ],
    skills: [
      {
        id: 'p2-terraform-cert',
        category: 'Cert',
        name: 'Terraform Associate 003',
        summary: 'HCL, state management, modules, remote backends',
        defaultStatus: 'in-progress',
        notes:
          'Exam domains: IaC concepts, Terraform purpose, internals (state, providers, plugins), usage (init/plan/apply/destroy), collaborate (modules, backends, workspaces), and Cloud / policy extras. This repo is your lab: root module, child modules, variables, outputs, and a tfvars example. Know why state exists and why you never commit it.',
        resources: [
          { label: 'Terraform Associate exam', href: 'https://developer.hashicorp.com/certifications/terraform-associate' },
          { label: 'Terraform language docs', href: 'https://developer.hashicorp.com/terraform/language' },
          { label: 'State documentation', href: 'https://developer.hashicorp.com/terraform/language/state' },
        ],
        actions: [
          'Run terraform init, plan, and apply from the terraform/ directory',
          'Explain each file in terraform/modules/vpc without looking it up',
          'Add a remote backend (S3 + DynamoDB lock) in a scratch branch — do not commit secrets',
        ],
      },
      {
        id: 'p2-python',
        category: 'Code',
        name: 'Python scripting',
        summary: 'boto3, Lambda, automation scripts',
        defaultStatus: 'not-started',
        notes:
          'You do not need to be a software engineer. You need scripts that list instances, rotate a tag, or glue an API. Start with boto3 against the account you already use, then wrap a tiny Lambda that runs on a schedule. Read errors from CloudWatch logs, not from Stack Overflow first.',
        resources: [
          { label: 'boto3 documentation', href: 'https://boto3.amazonaws.com/v1/documentation/api/latest/index.html' },
          { label: 'AWS Lambda Python', href: 'https://docs.aws.amazon.com/lambda/latest/dg/lambda-python.html' },
        ],
        actions: [
          'Write a boto3 script that prints this stack’s EC2 instance IDs',
          'Sketch a Lambda that would stop lab instances after hours',
        ],
      },
      {
        id: 'p2-git',
        category: 'Tools',
        name: 'Git + GitHub',
        summary: 'Version control, branching, pull requests',
        defaultStatus: 'not-started',
        notes:
          'IaC without Git is just clicking slower. Practice a trunk-based or short-lived branch workflow: feature branch, plan in CI later, PR description that explains the why. Never force-push main. Know git status, diff, log, and how to undo a local commit you have not pushed.',
        resources: [
          { label: 'GitHub flow', href: 'https://docs.github.com/en/get-started/using-github/github-flow' },
          { label: 'Pro Git (free book)', href: 'https://git-scm.com/book/en/v2' },
        ],
        actions: [
          'Put this terraform/ tree on a branch and open a PR-style writeup of what it creates',
          'Practice: create a branch, change one variable, commit, and revert it',
        ],
      },
      {
        id: 'p2-bash',
        category: 'Code',
        name: 'Bash scripting',
        summary: 'Shell automation, cron jobs, system tasks',
        defaultStatus: 'not-started',
        notes:
          'User data in this repo is a bash script. Get comfortable with shebangs, set -euo pipefail, quoting, and looping over files. You will use bash to wrap terraform, aws cli, and health checks long before you need Python.',
        resources: [
          { label: 'Bash guide', href: 'https://mywiki.wooledge.org/BashGuide' },
          { label: 'Google shell style', href: 'https://google.github.io/styleguide/shellguide.html' },
        ],
        actions: [
          'Rewrite the EC2 user_data block locally as a script with set -euo pipefail',
          'Write a one-liner that curls the ALB and exits 1 on non-200',
        ],
      },
      {
        id: 'p2-iac-rebuild',
        category: 'Project',
        name: 'IaC Rebuild',
        summary: 'Reprovision binGone infrastructure in Terraform',
        defaultStatus: 'in-progress',
        notes:
          'This is the portfolio piece for phase 2. Take a real app (binGone) and describe every resource in HCL: VPC, compute, data, DNS, secrets. Start from this practice stack as a template, then replace placeholders with the real topology. A README with architecture diagram + terraform apply output is the artifact.',
        resources: [
          { label: 'AWS provider docs', href: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs' },
          { label: 'Module structure', href: 'https://developer.hashicorp.com/terraform/language/modules/develop' },
        ],
        actions: [
          'Inventory binGone’s current AWS resources (or the ones you remember) in a spreadsheet',
          'Port one layer (VPC or compute) into a module modeled on terraform/modules',
          'Add outputs an operator would actually use: URL, DB endpoint, SG IDs',
        ],
      },
      {
        id: 'p2-aws-cli',
        category: 'Tools',
        name: 'AWS CLI',
        summary: 'Programmatic access, scripted deployments',
        defaultStatus: 'not-started',
        notes:
          'CLI is how you debug what Terraform just did. Practice aws sts get-caller-identity, describe-instances, elbv2 describe-load-balancers, and rds describe-db-instances filtered by the tags this stack applies. Profiles beat hardcoded keys. Never paste secrets into chat or git.',
        resources: [
          { label: 'AWS CLI v2 docs', href: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html' },
          { label: 'Named profiles', href: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html' },
        ],
        actions: [
          'Run aws sts get-caller-identity with the same profile Terraform uses',
          'After a future apply, describe the ALB and RDS from the CLI and match terraform output',
        ],
      },
    ],
  },
  {
    id: 'phase-3',
    number: '03',
    shortLabel: 'CloudOps',
    title: 'AWS Cloud Operations Engineer',
    subtitle: 'CloudOps · Est. 2–3 months · Operate and monitor infrastructure',
    salaryRange: '$95,000 – $120,000',
    location: 'Cloud Platform / Operations Engineer',
    jump: '+$52–77k vs today',
    roles: [
      'Cloud Operations Engineer',
      'Platform Engineer',
      'DevOps Engineer',
      'SRE (Jr)',
    ],
    skills: [
      {
        id: 'p3-cloudops-cert',
        category: 'Cert',
        name: 'AWS CloudOps',
        summary: 'Monitoring, incident response, automation, deployment',
        defaultStatus: 'not-started',
        notes:
          'CloudOps (SysOps successor) is about running what you built: metrics, logs, patching, backups, networking ops, and deployment. Study from an operator’s chair — what do you do at 2am when the ALB target is unhealthy? Pair exam domains with CloudWatch alarms on this stack.',
        resources: [
          { label: 'AWS CloudOps Engineer Associate', href: 'https://aws.amazon.com/certification/certified-cloudops-engineer-associate/' },
          { label: 'AWS re:Post CloudOps', href: 'https://repost.aws/tags/TAIFV7eizRQamsaY6A0Q7-gQ/aws-certified-sys-ops-administrator-associate' },
        ],
        actions: [
          'List the exam domains and star the ones this ALB+EC2+RDS lab already touches',
          'Draft an incident runbook: ALB 5xx → check targets → check nginx → check SG',
        ],
      },
      {
        id: 'p3-cloudwatch',
        category: 'Tools',
        name: 'CloudWatch + Grafana',
        summary: 'Dashboards, alarms, log insights, metrics',
        defaultStatus: 'not-started',
        notes:
          'If it is not graphed, it did not happen. Start with ALB request count, target 5xx, EC2 CPU, and RDS connections. Add an SNS email alarm. Grafana is optional polish once CloudWatch can answer “is the site up?” in 10 seconds.',
        resources: [
          { label: 'CloudWatch concepts', href: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html' },
          { label: 'Grafana AWS integration', href: 'https://grafana.com/docs/grafana/latest/datasources/aws-cloudwatch/' },
        ],
        actions: [
          'Design a 4-panel dashboard for this stack (ALB, EC2, RDS, 5xx)',
          'Write the alarm condition you would use for unhealthy targets',
        ],
      },
      {
        id: 'p3-docker-ecs',
        category: 'Tools',
        name: 'Docker + ECS',
        summary: 'Containerize apps, Fargate deployments',
        defaultStatus: 'not-started',
        notes:
          'Move off “nginx on a pet EC2” toward a container you can rebuild. Learn Dockerfile, image tags, and ECS Fargate task definitions. You do not need Kubernetes yet. Goal: same hello page served from a task behind the ALB.',
        resources: [
          { label: 'Docker getting started', href: 'https://docs.docker.com/get-started/' },
          { label: 'Amazon ECS on Fargate', href: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html' },
        ],
        actions: [
          'Write a Dockerfile that serves a static page with nginx',
          'Sketch the ECS service + target group that would replace aws_instance.app',
        ],
      },
      {
        id: 'p3-cicd',
        category: 'Tools',
        name: 'CI/CD pipelines',
        summary: 'GitHub Actions, AWS CodePipeline',
        defaultStatus: 'not-started',
        notes:
          'A pipeline is terraform fmt, validate, plan on PR, and apply on main with approvals. Start with GitHub Actions — you already live in git. OIDC to AWS beats long-lived keys. CodePipeline is useful later for AWS-native shops.',
        resources: [
          { label: 'GitHub Actions', href: 'https://docs.github.com/en/actions' },
          { label: 'Configure AWS credentials (OIDC)', href: 'https://github.com/aws-actions/configure-aws-credentials' },
        ],
        actions: [
          'Draft a workflow that runs terraform fmt -check and terraform validate',
          'Write the branch protection rule you would require before apply',
        ],
      },
      {
        id: 'p3-monitoring',
        category: 'Project',
        name: 'Monitoring stack',
        summary: 'CloudWatch dashboards + SNS alerting on your apps',
        defaultStatus: 'not-started',
        notes:
          'Ship monitoring as a Terraform module: log group, dashboard JSON, SNS topic, and a handful of alarms. Wire it to binGone or this lab. The deliverable is a screenshot of the dashboard plus an email you received from a test alarm.',
        resources: [
          { label: 'CloudWatch Terraform resources', href: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_metric_alarm' },
          { label: 'SNS topics', href: 'https://docs.aws.amazon.com/sns/latest/dg/welcome.html' },
        ],
        actions: [
          'Add a CloudWatch alarm resource in a new terraform module',
          'Trigger a test alarm and save the notification as proof',
        ],
      },
      {
        id: 'p3-yaml',
        category: 'Code',
        name: 'YAML fluency',
        summary: 'Pipeline definitions, K8s manifests, configs',
        defaultStatus: 'not-started',
        notes:
          'YAML is indentation-sensitive config. GitHub Actions, ECS task defs, and later Kubernetes all speak it. Practice reading nested keys, lists vs maps, and why a missing space breaks a pipeline. You do not need to memorize K8s APIs yet — just stop fearing the file.',
        resources: [
          { label: 'YAML spec (1.2)', href: 'https://yaml.org/spec/1.2.2/' },
          { label: 'GitHub Actions workflow syntax', href: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions' },
        ],
        actions: [
          'Hand-write a 20-line GitHub Actions workflow without copying',
          'Find and fix a deliberate indent error in a sample workflow',
        ],
      },
    ],
  },
  {
    id: 'phase-4',
    number: '04',
    shortLabel: 'SAP',
    title: 'AWS Solutions Architect Professional',
    subtitle: 'SAP-C02 · Est. 6–9 months · Senior design authority',
    salaryRange: '$130,000 – $160,000',
    location: 'Senior Cloud Engineer / Solutions Architect',
    jump: '+$87–117k vs today',
    roles: [
      'Senior Cloud Engineer',
      'Solutions Architect',
      'Healthcare Cloud Architect',
      'Lead Infrastructure Engineer',
    ],
    skills: [
      {
        id: 'p4-sap-cert',
        category: 'Cert',
        name: 'AWS SAP-C02',
        summary: 'Multi-account design, migrations, cost at scale',
        defaultStatus: 'not-started',
        notes:
          'Professional is scenario-heavy: hybrid connectivity, migrations, multi-account, and tradeoffs under constraints. Do not sit this until you have ops hours from phase 3. Study by designing, not by dumps — every practice question should produce a diagram.',
        resources: [
          { label: 'SAP-C02 exam guide', href: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/' },
          { label: 'AWS whitepapers', href: 'https://aws.amazon.com/whitepapers/' },
        ],
        actions: [
          'After CloudOps, schedule a first SAP practice exam to baseline weak domains',
          'Keep a decision log: for each design, write why you rejected the cheaper option',
        ],
      },
      {
        id: 'p4-multi-account',
        category: 'Tools',
        name: 'Multi-account AWS',
        summary: 'Organizations, Control Tower, Service Control Policies',
        defaultStatus: 'not-started',
        notes:
          'Healthcare and any serious shop split prod / nonprod / sandbox. Learn Organizations, OUs, SCPs (“deny s3:DeleteBucket in prod”), and Control Tower landing zones. Your current single-account lab is the sandbox OU in that mental model.',
        resources: [
          { label: 'AWS Organizations', href: 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html' },
          { label: 'Control Tower', href: 'https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html' },
        ],
        actions: [
          'Draw an OU tree for Willis Empire Group: management, security, sandbox, prod',
          'Write one SCP that would have blocked a dangerous action in this lab',
        ],
      },
      {
        id: 'p4-eks',
        category: 'Tools',
        name: 'Kubernetes (EKS)',
        summary: 'Container orchestration, autoscaling, Helm',
        defaultStatus: 'not-started',
        notes:
          'EKS comes after ECS is comfortable. Learn pods, deployments, services, and how an ingress talks to the same ALB pattern you already know. Helm is packaging. Autoscaling is HPA + cluster autoscaler / Karpenter. Do not start here while Terraform Associate is open.',
        resources: [
          { label: 'Kubernetes basics', href: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/' },
          { label: 'Amazon EKS', href: 'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html' },
        ],
        actions: [
          'Complete the official Kubernetes interactive tutorial (pods + deployments)',
          'Map ALB target groups to a Kubernetes Service/Ingress in a diagram',
        ],
      },
      {
        id: 'p4-finops',
        category: 'Tools',
        name: 'FinOps',
        summary: 'Reserved instances, Savings Plans, cost governance',
        defaultStatus: 'not-started',
        notes:
          'Senior architects are asked what it costs. Learn Cost Explorer, allocation tags (you already tag Project=tf-practice), Savings Plans vs Reserved Instances, and how a NAT gateway or idle ALB burns money. Practice destroying labs. Cost is a design constraint equal to latency.',
        resources: [
          { label: 'AWS Cost Management', href: 'https://docs.aws.amazon.com/cost-management/latest/userguide/what-is-aws-cost-management.html' },
          { label: 'FinOps Foundation', href: 'https://www.finops.org/' },
        ],
        actions: [
          'After any apply, check Cost Explorer the next day and list the top 3 line items',
          'Decide when t3.micro vs savings plans would matter for a real binGone load',
        ],
      },
      {
        id: 'p4-hipaa-arch',
        category: 'Project',
        name: 'HIPAA architecture',
        summary: 'Multi-VPC, encrypted, audit-logged healthcare build',
        defaultStatus: 'not-started',
        notes:
          'Portfolio capstone for the senior band: a reference architecture that could hold PHI. Private subnets, encryption at rest and in transit, CloudTrail, no public RDS, tight IAM, VPC endpoints, and a written threat model. Terraform is the source of truth. Label it as a lab, not a covered-entity production system.',
        resources: [
          { label: 'Architecting for HIPAA', href: 'https://aws.amazon.com/blogs/security/architecting-for-hipaa-security-and-compliance-on-aws/' },
          { label: 'AWS KMS concepts', href: 'https://docs.aws.amazon.com/kms/latest/developerguide/overview.html' },
        ],
        actions: [
          'Extend this lab: encryption on RDS, CloudTrail, and VPC flow logs in Terraform',
          'Write a one-page threat model: what happens if an EC2 instance is compromised',
        ],
      },
      {
        id: 'p4-healthcare-cloud',
        category: 'Domain',
        name: 'Healthcare cloud',
        summary: 'HIPAA, PHI handling, covered entity requirements',
        defaultStatus: 'not-started',
        notes:
          'Know covered entity vs business associate, minimum necessary, and why encryption + access logs are table stakes. Connect Epic operational reality (change freezes, break-glass) to cloud controls. This domain is how you price above generic cloud engineers in NYC healthcare.',
        resources: [
          { label: 'HHS HIPAA for professionals', href: 'https://www.hhs.gov/hipaa/for-professionals/index.html' },
          { label: 'AWS BAA', href: 'https://aws.amazon.com/compliance/hipaa-compliance/' },
        ],
        actions: [
          'Explain in 90 seconds whether this practice stack would be allowed to store PHI (it would not)',
          'List 5 controls a Northwell cloud review would demand that this lab still lacks',
        ],
      },
    ],
  },
  {
    id: 'phase-5',
    number: '05',
    shortLabel: 'Security',
    title: 'AWS Security Specialty',
    subtitle: 'SCS-C02 · Est. 3–5 months · Domain ownership',
    salaryRange: '$155,000 – $200,000+',
    location: 'Principal Engineer / Cloud Security Architect',
    jump: '+$112–157k vs today',
    roles: [
      'Principal Cloud Engineer',
      'Cloud Security Architect',
      'Healthcare Cloud Architect',
      'VP of Cloud Infrastructure',
    ],
    skills: [
      {
        id: 'p5-security-cert',
        category: 'Cert',
        name: 'AWS Security Specialty',
        summary: 'IAM deep dive, KMS, GuardDuty, compliance',
        defaultStatus: 'not-started',
        notes:
          'SCS is for people who already design systems. Domains cover incident response, logging/monitoring, infra security, identity, and data protection. Study after you have a HIPAA lab to point at. Identity is the hardest section — policies, permission boundaries, and federation.',
        resources: [
          { label: 'Security Specialty exam', href: 'https://aws.amazon.com/certification/certified-security-specialty/' },
          { label: 'IAM user guide', href: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html' },
        ],
        actions: [
          'After SAP momentum, sit one SCS practice test to see if identity is the gap',
          'Rewrite the implicit “EC2 can talk to RDS” story as explicit IAM + SG + KMS keys',
        ],
      },
      {
        id: 'p5-security-tools',
        category: 'Tools',
        name: 'Security toolchain',
        summary: 'WAF, Shield Advanced, Secrets Manager, Macie',
        defaultStatus: 'not-started',
        notes:
          'Put a WAF on the ALB, store the RDS password in Secrets Manager (not Terraform state if you can avoid it), and know when Shield Standard vs Advanced is worth it. Macie is for S3 PHI discovery. Learn the tool, then decide if this lab actually needs it.',
        resources: [
          { label: 'AWS WAF', href: 'https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html' },
          { label: 'Secrets Manager', href: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html' },
        ],
        actions: [
          'Replace random_password in state with a Secrets Manager pattern in a branch',
          'Attach a WAF web ACL diagram to the ALB in this architecture',
        ],
      },
      {
        id: 'p5-hipaa-hitech',
        category: 'Domain',
        name: 'HIPAA / HITECH',
        summary: 'PHI encryption, audit trails, breach response',
        defaultStatus: 'not-started',
        notes:
          'HITECH raised the cost of getting this wrong. Know encryption in transit and at rest, audit controls, and what a breach notification timeline looks like. Pair with CloudTrail + S3 object lock thinking. You are aiming to sit in the room with compliance, not just pass a cert.',
        resources: [
          { label: 'HITECH Act enforcement', href: 'https://www.hhs.gov/hipaa/for-professionals/special-topics/hitech-act-enforcement-interim-final-rule/index.html' },
          { label: 'CloudTrail', href: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html' },
        ],
        actions: [
          'Write a breach-response outline: detect, contain, notify, remediate',
          'List which logs this stack is missing today (CloudTrail, VPC flow, ALB access)',
        ],
      },
      {
        id: 'p5-threat',
        category: 'Tools',
        name: 'Threat detection',
        summary: 'GuardDuty, CloudTrail, Security Hub, Inspector',
        defaultStatus: 'not-started',
        notes:
          'Turn the lights on: GuardDuty for findings, Security Hub as the inbox, Inspector for CVEs on compute, CloudTrail as the source of truth. For a lab account, enable GuardDuty and Security Hub and learn to read a finding. This is how principal-level people talk about detection coverage.',
        resources: [
          { label: 'Amazon GuardDuty', href: 'https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html' },
          { label: 'Security Hub', href: 'https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html' },
        ],
        actions: [
          'Enable GuardDuty in a sandbox and screenshot one sample finding',
          'Map each tool to a question: who, what, when, how bad',
        ],
      },
      {
        id: 'p5-hardening',
        category: 'Project',
        name: 'Security hardening',
        summary: 'Least privilege IAM, encrypted S3, WAF on all apps',
        defaultStatus: 'not-started',
        notes:
          'Take binGone + this lab and produce a hardening PR list: no 0.0.0.0/0 SSH, IMDSv2, encrypted volumes, ALB HTTPS, WAF, secrets out of user data, and scoped IAM. The artifact is a before/after architecture and a Terraform diff. This is the project that makes the Security Specialty real.',
        resources: [
          { label: 'Security best practices for IAM', href: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html' },
          { label: 'EC2 instance metadata v2', href: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html' },
        ],
        actions: [
          'Close SSH from 0.0.0.0/0 in terraform/modules/security_groups',
          'Add a checklist issue: HTTPS listener, encrypted RDS, IMDSv2 required',
        ],
      },
      {
        id: 'p5-healthcare-niche',
        category: 'Domain',
        name: 'Healthcare niche',
        summary: 'Northwell context + security cert = rare profile',
        defaultStatus: 'not-started',
        notes:
          'The end state is a story only you can tell: Epic at Northwell, shipped apps, IaC, ops, then security specialty. Practice the narrative until it is 90 seconds. Target NYC healthcare cloud, not generic FAANG. Keep LinkedIn and this tracker aligned so interviews hear one through-line.',
        resources: [
          { label: 'AWS healthcare', href: 'https://aws.amazon.com/health/' },
        ],
        actions: [
          'Write your 90-second pitch covering Epic → SAA → Terraform → Security',
          'Pick 5 companies/systems on Long Island or NYC that hire this exact mix',
        ],
      },
    ],
  },
]

export function nextStatus(current) {
  const index = STATUS_CYCLE.indexOf(current)
  const safeIndex = index === -1 ? 0 : index
  return STATUS_CYCLE[(safeIndex + 1) % STATUS_CYCLE.length]
}

export function defaultStatuses() {
  const statuses = {}
  for (const phase of PHASES) {
    for (const skill of phase.skills) {
      statuses[skill.id] = skill.defaultStatus
    }
  }
  return statuses
}

export function allSkills() {
  return PHASES.flatMap((phase) => phase.skills)
}

export function findSkill(id) {
  for (const phase of PHASES) {
    const skill = phase.skills.find((item) => item.id === id)
    if (skill) {
      return { skill, phase }
    }
  }
  return null
}

export function phaseCounts(phase, statuses) {
  const total = phase.skills.length
  const done = phase.skills.filter((skill) => statuses[skill.id] === 'done').length
  const inProgress = phase.skills.filter(
    (skill) => statuses[skill.id] === 'in-progress',
  ).length
  return { done, inProgress, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) }
}

export function phaseBadge(phase, statuses) {
  const { done, inProgress, total } = phaseCounts(phase, statuses)
  if (done === total) {
    return { label: 'Complete', className: 'status-done' }
  }
  if (done > 0 || inProgress > 0) {
    return { label: 'In progress', className: 'status-now' }
  }
  return { label: 'Up next', className: 'status-next' }
}

export function computeProgress(statuses) {
  const skills = allSkills()
  const total = skills.length
  const done = skills.filter((skill) => statuses[skill.id] === 'done').length
  const inProgress = skills.filter((skill) => statuses[skill.id] === 'in-progress').length
  const remaining = total - done
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)

  const currentPhase =
    PHASES.find((phase) => {
      const { done: phaseDone, total: phaseTotal } = phaseCounts(phase, statuses)
      return phaseDone < phaseTotal
    }) ?? PHASES[PHASES.length - 1]

  return { total, done, inProgress, remaining, percent, currentPhase }
}

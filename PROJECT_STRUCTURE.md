# VoiceFlow Repository Structure

```
voiceflow/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                    # CI/CD Pipeline
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml            # Bug Report Template
│   │   └── feature_request.yml       # Feature Request Template
│   ├── pull_request_template.yml     # PR Template
│   └── PROFILE.md                    # GitHub Profile Info
│
├── app/
│   ├── layout.tsx                    # Root Layout
│   ├── page.tsx                      # Home Page
│   └── globals.css                   # Global Styles
│
├── components/
│   └── ui/
│       └── button.tsx                # UI Components
│
├── lib/
│   └── utils.ts                      # Utility Functions
│
├── public/                           # Static Assets
│
├── .env.example                      # Environment Variables Template
├── .gitignore                        # Git Ignore Rules
├── CHANGELOG.md                      # Version History
├── CONTRIBUTING.md                   # Contribution Guidelines
├── LICENSE                           # MIT License
├── README.md                         # Project Documentation
├── SECURITY.md                       # Security Policy
├── next.config.mjs                   # Next.js Configuration
├── package.json                      # Project Dependencies
├── tsconfig.json                     # TypeScript Configuration
└── README.md                         # This File
```

## Key Files Overview

### Documentation
- **README.md** - Complete project documentation with features and setup
- **CONTRIBUTING.md** - Guidelines for contributors
- **CHANGELOG.md** - Version history and releases
- **SECURITY.md** - Security vulnerability reporting
- **LICENSE** - MIT License for open source distribution

### GitHub Configuration
- **.github/workflows/ci.yml** - Automated testing and deployment
- **.github/ISSUE_TEMPLATE/** - Structured issue templates
- **.github/pull_request_template.yml** - PR consistency template

### Configuration Files
- **next.config.mjs** - Next.js framework configuration
- **tsconfig.json** - TypeScript compiler options
- **package.json** - Dependencies and scripts
- **.env.example** - Environment variables template
- **.gitignore** - Files to exclude from version control

## Getting Started

See [README.md](README.md) for complete setup instructions.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

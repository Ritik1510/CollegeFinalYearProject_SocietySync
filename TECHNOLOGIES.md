# Turbo 

`Turborepo` is a high-performance, open-source build system for JavaScript and TypeScript monorepos (single repositories containing multiple projects). It accelerates build processes by intelligently caching results locally and remotely, ensuring only changed code is rebuilt and allowing teams and CI/CD pipelines to avoid redundant work. Key features include fast, incremental builds, a dependency-aware task scheduler, and support for sharing code and configurations across different projects within the monorepo.

```json
    {
    "$schema": "https://turbo.build/schema.json",
    "pipeline": {
            "build": {
            "dependsOn": ["^build"],
            "outputs": ["dist/**", ".next/**", "build/**"]
            },
            "dev": {
            "cache": false
            },
            "lint": {},
            "test": {}
        }
    }
```
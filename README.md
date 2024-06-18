
# Template Repository - Shifting Security Left a Hands On Workshop

The following repository contains training material workshops on shifting security left.

This workshop is held at venue `X` on `DATE` at `TIME`.

## Workshop Outline

*Shifting Security Left a Hands On Workshop* provides participants with an introduction to baking security into the software development process and leveraging DevSecOps tooling to support this. 

Attendees will learn about setting up a local development environment which includes security tools such as IDE plugins. Students will then progress into learning how to use DevSecOps pipelines to detect security issues such as accidentally committed secrets.

The workshop will then wrap up with tips on how to handle secure deployments and a look to what the future holds in this space.

## Pre-setup Phase

In order to fully participate in this workshop you will need a GitHub account.

You can obtain this by signing up at http://www.github.com. 

Students will be able to sign up for a .edu account which comes with some added bonuses, such as being able to setup private repositories for free.

Once your account is setup, you will need to `Fork` and `Clone` this repository.

A full guide to setting up the tooling for this workshop can be found in the Part 1 README file.

[Part 1 - Security within the development environment](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#part-1---security-within-the-development-environment)


## Part 1: Security within the development environment

Attendees will learn to integrate security tools and pre-commit hooks into their development environment thus enhancing code security off the bat:

1. 3rd party plugin integration. In this part of the talk we explore third-party tooling that can be integrated into the IDE to aid in linting and SAST. An example here includes the SonarLint plugin. We also look at CodeQL and GitHub Copilot [Part 1 - Module1: IDE Integration](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#module-1-ide-integration)

2. Setting up pre-commit hooks to aid in security will be explored. This includes tools such as AWS Labs git-secrets and Talisman. [Part 1 - Module2: pre-commit Hooks](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#module-2-pre-commit-hooks)

3. Git ignores. Git ignore files are a great way of preventing config files which may contain secrets, and other undesirable files such as .zips accidentally being committed. In this portion of the talk we provide practical examples of using .gitignore to aid in security. [Part 1 - Module 3: Preventing accidental commits](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#module-3-preventing-accidental-commits)


## Part 2: Repository Scanning

Here we cover some repository scanning techniques, including secrets scanning and vulnerability detection, using tools like GitHub's dependabot and Tartufo.

1. Secrets scanning. A demonstration of how secret scanning can be performed in the source code. This includes examples of Tartufo/TruffleHog, GitHub's tooling and Horusec. [Part 2 - Module 4:Secrets Scanning](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-4secrets-scanning)

2. Handling secrets in GitHub. GitHub provides users the ability to store secrets such as API keys securely within the SCM, and pull these out at deployment time. Here participants learn the basics of the environment within GitHub and how to leverage GitHub native secret storage mechanisms. We will also discuss other options for storing secrets and pulling them into CI/CD pipelines [Part 2 - Module 5: Handling secrets in GitHub](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-5handling-secrets-in-github)

3. Detecting security vulnerabilities within the repository. Students are introduced to the concept of detecting security vulnerabilities in the source code repository. A general overview of techniques and approaches is given, as well as those specific to GitHub.[Part 2 - Module 6:Detecting Security vulnerabilities](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-5handling-secrets-in-github)

4. Vulnerable dependency detection. GitHub's dependabot provides a mechanism for analyzing the dependencies associated with a project and understanding if they contain security vulnerabilities. Walkthrough of dependabot is performed. [Part 2 - Module 7:Vulnerable dependencies](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-7vulnerable-dependencies) 

5. Static analysis. GitHub Advanced Security contains a GitHub native SAST tool built on CodeQL. This section of the class walks through its feature sets and how it can be integrated into GitHub actions. This section of the talk will also cover Horusec and how it cane be used in the same capacity.[Part 2 - Module 8:Static Analysis](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-8static-analysis)

6. Branch protection and pull request gating mechanisms. The penultimate topic covered is how branch protection rules and PR gating mechanisms can leverage SAST tools to block pull requests that fail security checks.[Module 9:Branch protection rules](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-9branch-protection-rules)

7. SBOMs. A final note on SBOMs. These can be used to extract a Software Bill of Materials from your applications stored in GitHub. [Part 2 - Module 10:SBOMs Software Bill of Materials](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-10sboms-software-bill-of-materials)

## Wrap-up

Discussion of future trends in this space.

Recap of what we've learned


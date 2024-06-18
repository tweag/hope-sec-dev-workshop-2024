<div style="color:white">
  
![HOPE XV Logo](hopexv_logo.png "HOPE XV Logo")

</div>

# Mastering Security in Development - H.O.P.E 2024

H.O.P.E. stands for Hackers On Planet Earth, one of the oldest hacker events in the world. 

The following repository contains training material workshops on mastring security in the software development process.

This workshop is held at [H.O.P.E 2024 in NYC at St John's University](https://www.hope.net/workshops.html)


## Workshop Outline

This is a hands-on workshop that provides participants with an introduction to secure software development and leveraging DevSecOps tooling to aid in this. Participants will learn about setting up a local development environment that includes security tooling. Following this, they will progress into learning how to use DevSecOps tooling within GitHub to detect security issues and flag accidentally committed secrets. The workshop will then conclude with a review of how GitHub runners and other features can be used to aid in secure deployments.

For the purposes of th workshop the local development environment will leverage GitHub CodeSpaces. 

## Pre-setup Phase

In order to fully participate in this workshop you will need a GitHub account.

You can obtain this by signing up at http://www.github.com. 

Students will be able to sign up for a .edu account which comes with some added bonuses, such as being able to setup private repositories for free.

Once your account is setup, you will need to `Fork` and `Clone` this repository.

A full guide to setting up the tooling for this workshop can be found in the Part 1 README file.

[Part 1 - Security within the development environment](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#part-1---security-within-the-development-environment)


## Part 1: Security within the development environment

Attendees will learn to integrate security plugins and pre-commit hooks into their development environment, including IDE:

1. In this section, we will explore how third-party tools can be integrated into the IDE to enhance linting and Static Application Security Testing (SAST). For instance, the SonarLint plugin provides valuable linting capabilities. Additionally, we will examine the use of CodeQL and GitHub Copilot. [Part 1 - Module1: IDE Integration](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#module-1-ide-integration)

2. We will explore setting up pre-commit hooks to enhance security. This includes utilizing tools like AWS Labs' git-secrets and Talisman. [Part 1 - Module2: pre-commit Hooks](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#module-2-pre-commit-hooks)

3.Git ignore files are an effective way to prevent the accidental commitment of configuration files that may contain secrets, as well as other undesirable files like .zips. In this part of the talk, we will provide practical examples of using .gitignore to enhance security. [Part 1 - Module 3: Preventing accidental commits](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part1#module-3-preventing-accidental-commits)


## Part 2: Repository Scanning

In this section, we will cover various repository scanning techniques, including secrets scanning and vulnerability detection. We will utilize tools such as GitHub's Dependabot and Tartufo.

1. This section will demonstrate how to perform secret scanning in the source code. We will include examples using tools such as Tartufo/TruffleHog, GitHub's secret scanning tools, and Horusec. [Part 2 - Module 4:Secrets Scanning](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-4secrets-scanning)

2. GitHub offers a secure method for storing secrets, such as API keys, within the source control management system (SCM), allowing them to be accessed during deployment. In this section, participants will learn the basics of the GitHub environment and how to utilize GitHub's native secret storage mechanisms. We will also explore additional options for storing secrets and integrating them into CI/CD pipelines. [Part 2 - Module 5: Handling secrets in GitHub](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-5handling-secrets-in-github)

3. Students will be introduced to the concept of detecting security vulnerabilities in the source code repository. This section provides a general overview of techniques and approaches, with a focus on methods specific to GitHub.[Part 2 - Module 6:Detecting Security vulnerabilities](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-5handling-secrets-in-github)

4. GitHub's Dependabot offers a mechanism for analyzing a project's dependencies to identify potential security vulnerabilities. This section includes a walkthrough of how to use Dependabot for this purpose. [Part 2 - Module 7:Vulnerable dependencies](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-7vulnerable-dependencies) 

5. GitHub Advanced Security includes a native SAST tool built on CodeQL. This section will walk through its features and demonstrate how to integrate it into GitHub Actions. Additionally, we will cover Horusec and how it can be used in a similar capacity. [Part 2 - Module 8:Static Analysis](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-8static-analysis)

6. The penultimate topic focuses on using branch protection rules and pull request gating mechanisms to enhance security. This includes leveraging SAST tools to block pull requests that fail security checks.  [Module 9:Branch protection rules](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-9branch-protection-rules)

7. A final note on Software Bill of Materials (SBOMs): these can be utilized to extract a comprehensive list of components from your applications stored in GitHub. [Part 2 - Module 10:SBOMs Software Bill of Materials](https://github.com/tweag/dev-sec-ops-workshop/tree/main/part2#module-10sboms-software-bill-of-materials)

## Wrap-up

A quick review of everything we learned in the H.O.P.E Workshop


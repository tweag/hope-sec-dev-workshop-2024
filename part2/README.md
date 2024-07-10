
# Part 2: Repository Scanning 


For this part of the workshop we've provide two vulnerable applications to work with.

One is Java based, and the second is JavaScript. These can be found under:

1. VulnerableApp (Java)

2. VulnerableAppTwo (JavaScript)

We will start by looking at how secrets scanning tools can be used against these applications.

The following examples largely take place on the GitHub platform. You can use Codespace for for any commandline prompts, or complete this locally on your machine.


## Module 4:Secrets scanning

We can use both GitHub native and CI/CD orientated tools to scan for secrets in our repository. In this part of the workshop we are going to look at three options:

1. GitHub Native secrets scanning

2. TruffleHog (and Tartufo) which can be executed from GitHub Actions

3. Horusec, which we will briefly walk through.


### GitHub Native Secrets Scanning

GitHub provides us with an built-in mechanism to scan for secrets. This includes the ability to scan for custom patterns as well as common key formats, such as AWS API keys.

Configuration of Secrets scanning in GitHub, including the configuration of custom patterns is found under `Settings > Code security and analysis`.

![Part 2 - Secrets scanning](./img/secretsconfig.png "Secrets configuration")

We've already added the regex for detecting the private key. But let's see how this works. 

Select the `PEM` detection rule and open it up. Under here is the `secret format` 

```console
-----BEGIN PRIVATE KEY-----(.|\s)*?-----END PRIVATE KEY-----
```

This regex will detect files such as our `.pem` key and then add an alert to the `Security` tab.

You can create a new pattern here to detect other secret types. Hit the back button and go back to the previous screen.

Select the `New pattern` option and then use the following regex to test for AWS API keys. You may remember we did something similar in Part 1:

```console

"[A-Za-z0-9/+=]{40}"

```

![Part 2 - Secrets Regex](./img/secretsregex.png "Secrets Regex")

If you want to test the regex, you can do this by pasting in our dummy example key from `vuln.ini` in Part 1, and creating a dry run. 

Select the `Publish pattern` button. Congrats, you have now added your own custom secrets detection.

We can find detected secrets under the `Security > Secret scanning` option. Switch to this screen.

If you select the PEM detection finding, you will find some helpful information including:

1. The finding

2. Remediation steps

3. The detected location
 
If you wish, you can remove the key from your forked repository and commit and push the change. Remember we can use the steps provided in `part1` to remove a file from Git. 

Re-visit this screen and then choose an option from the `Close as` drop down to close out the finding, for example `Revoked`

Congrats, you've written a detection rule and closed out a finding. 

Let's look at other secrets scanning tools and how they can be integrated with GitHub Actions.


### TruffleHog, Tartufo and GitHub Actions

TruffleHog is a tool that can be used to scan for secrets in source code. GoDaddy maintains their own version of this, which has a wrapper adding extra configuration functionality called Tartufo. For this part of the workshop we will use a pre-setup version of TruffleHog which is located in the `.github/workflows/` folder.

After you have experimented with TruffleHog, we will setup Tartufo to demonstrate how tooling can be added to our CI/CD pipelines

As you will now see, we have an Action configured that uses the TruffleHog tool to scan for secrets in the code base.

Under the `Actions` tab, look for an event that has trigged `.github/workflows/truff.yaml `

You will notice this has a red circle with an X in it (❌), which means the job failed. 

Open this workflow run up.

You will see a stage called `Test for Secrets` - this has executed a scan against the code base to test for secrets.

Here we can see it detected the JDBC connection in VulnerableApp (in addition to the .pem key file)

```console

test: part2/src/vulnerableapp.java#L16
Found unverified JDBC result 🐷🔑

```

If we open up this file, we can see the offending line of code:

```java

Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/test?user=sqluser&password=sqlpassword");

```

The hardcoded credentials in the DB connection have been flagged.

Setting up a new Action from the marketplace is fairly staight forward. If we want to compare the results of TruffleHog and Tartufo we can do this by adding the 
the Action following the instructions here: https://github.com/marketplace/actions/tartufo-scan

To add the new workflow create a new `.github/workflows/tartufo.yml` file.

Add the following configuration to this:

```yaml
 
on:
  push:
    branches:
      - main
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - name: Tartufo Scan
      uses: godaddy/tartufo-action@4.1.0

```

Commit this change and push it to GitHub. 

The Action will now execute and you should see it under the `Actions` tab. When it runs it will fail.

We can drill into the `Action` by selecting its workflow from the left hand menu and then selecting the latest run.

When this loads, select the failed stage and it will open up.

There's a lot of information displayed here, but if you dig through it you will see that the AWS API key and the `.pem` file have been discovered.

```console

Commit hash: 00d808190419d4a6ee0886d616d568e206792b58
Branch: main
diff --git a/part2/VulnerableAppTwo/keys/rsaexample.pem b/part2/VulnerableAppTwo/keys/rsaexample.pem
new file mode 100644
index 0000000..523c04d
--- /dev/null
+++ b/part2/VulnerableAppTwo/keys/rsaexample.pem
@@ -0,0 +1,28 @@

```

So now we have two tools running in our Actions workflows to detect for secrets and can compare the output of them both. 

You've also seen how easy it is to add a marketplace action to your repository. There are numerous Actions available in the marketplace including integrations with major security vendor tooling. 

Let's try another example. 

### Horusec

Horusec is a tool that bundles together multiple security scanners. We can use it locally or within a CI/CD pipeline. Its full fledged feature set leverages containers to run multiple tools and then aggregates the findings. You can read more about it at:

https://github.com/ZupIT/horusec

Let's try a quick experiment using the Action from the [market place](https://github.com/marketplace/actions/horusec).

We can copy this into a new YAML file at `.github/workflows/horusec.yml`:

```yaml
name: Horusec Security Scan

on: [push]

jobs:
  horusec-security-scan:
    runs-on: ubuntu-latest
    name: Run Horusec Security Scan
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Run Horusec Security Scan
        id: run_horusec
        uses: fike/horusec-action@v0.2.2
        with:
          arguments: -c=horusec-config.json -p ./
```          

Commit this and push it back up to GitHub.

Once the workflow has finished executing, we can then drill into the results. You'll see that unlike Tartufo and TrufflHog we also have a lot of other security findings. We'll revist these later in the SAST section of this workshop. For now though, we can drill down into the findings and see that Horusec has also found the `.pem` keyfile:

```console

Language: Leaks
Severity: CRITICAL
Line: 41
Column: 0
SecurityTool: HorusecEngine
Confidence: MEDIUM
File: /github/workspace/part2/README.md
Code: -----BEGIN PRIVATE KEY-----(.|\s)*?-----END PRIVATE KEY-----
RuleID: HS-LEAKS-12
Type: Vulnerability
ReferenceHash: 943157e96e40574c92c9313d40a13689dc4c5b176d54e156c8e7c5f1a2ddd8ee
Details: (1/1) * Possible vulnerability detected: Asymmetric Private Key
Found SSH and/or x.509 Cerficates among the files of your project, make sure you want this kind of information inside your Git repo, since it can be missused by someone with access to any kind of copy.  For more information checkout the CWE-312 (https://cwe.mitre.org/data/definitions/312.html) advisory.

```

So in this section of the workshop we saw multiple examples of tools we can use to scan for leaked credentials, passwords, API Keys and similar.

For a real project we would now want to go through the steps of fixing the code to remove the hardcoding, rotating the credentials and removing the detected ones from the repository. If you would like, try removing the `.pem` file with `git rm <path/to/file>`, committing the change and pushing it back up to GitHub.

You can now view the output from the various Actions you have setup to see what's changed. 

So we have figured out how to detect secrets leakage, but what about if we need to safely use our example AWS key in Part 1 or similar for deployment in CI/CD pipelines?

Let's now take a look at where we might store the credentials to avoid this happening again.


## Module 5:Handling secrets in GitHub

We can avoid hard coding secrets into files through using a secrets manager. GitHub comes with one which can be accessed under 

`Settings > Secrets and variables > Actions`

We can create a new secret for our project by selecting the `New repository secret` button.

Give you secret a name e.g. `demo_secret`.

Add a `Secret` - let's use something simple like `password` for this example. Of course, this is not a good option for a real life password!

This secret should now be visibile:


![Part 2 - Secret in GitHub](./img/reposecret.png "Secret in GitHub")

This secret can be used now in Actions pipelines, to avoid having to hard code it into a file.

Let's try this out.

Create a new Action in your `.github/workflows` directory called `usingsecrets.yml`. To this file add the following code:

```yaml

name: Example Using Secrets

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  secrets:
    runs-on: ubuntu-latest
    name: Demo Using Secrets
    steps:
    - name: Echo Out The Secret
      env:
        bsides_secret: ${{ secrets.demo_secret }}
      run: echo "$bsides_secret"

```

Commit this and push it up to GitHub, and then check out the Actions tab.

You will see that it executed. A nice feature is, Actions is smart enough to prevent the `echo` statement from leaking our password:

```console
Run echo "$bsides_secret"
***
```

Our password in this example has been replaced with `***`.

So that's a basic guide to how we can detect secrets from GitHub's native tooling and GitHub Actions using a third party tool, as well as use GitHub's secrets storage mechanism.

We will now take a look at how we can detect security vulnerabilities across our code base. 

## Module 6:Detecting secutity vulnerabilities 

GitHub supports a number of mechanisms for handling security vulnerabilities including:

1. SAST

2. Dependency Analysis

3. Secrets scanning 

4. SBOMS

We can also add a security policy to our repository so that contributors know how to responsibly report findings. To do this, navigate to the `Security` tab.

From here we can select the `Set up a security policy` button. Next select the `Start setup` button.

Let's add a dummy policy in. You can add anything you like for now.  

Save this.

If you return to the `Security overview` you will now see the `Security policy` is enabled

That was pretty simple! Let's move onto seeing how we can detect vulnerabilities.

## Module 7:Vulnerable dependencies 

In the forked repository you will notice that a pull request has been created. This is because GitHub has detected we have a vulnerable dependency in our `pom.xml` and `package.json` files.

Click on the first pull request in the list, and you can find more information.

We can see that merging this pull request fixes 4 dependabot alerts in relation to Log4J:

1. Remote code injection 

2. Incomplete fix 

3. Improper Input Validation and Uncontrolled Recursion

4. Improper Input Validation in Apache Log4j 


If you merge in this PR it will fix the issue. If you are unfamiliar with this concept, GitHub provides an overview here: https://docs.github.com/en/code-security/dependabot/working-with-dependabot/managing-pull-requests-for-dependency-updates

You can also try this with the JavaScript related dependency issues to fix the vulnerabilities.  

Later in this workshop we will be looking at how you can extract the list of dependencies as an SBOM. Now we have fixed vulnerabilities in our repository, let's take a look at the application source code again.


## Module 8:Static Analysis

In Part 1 we ran CodeQL locally and executed a query against the codebase. This is great for doing local research and experimentation. But what if we want to scan changes to the code on the fly, and from multiple commiters? That's where CodeQL integrated into GitHub comes in handy. With this feature we can run CodeQL as a GitHub Action and scan any code that is a supported language pushed into the repository for vulnerabilities. 

In this example we have enabled CodeQL by default in this repository. Let's take a look at the configuration.

Go to the `Actions` tab in GitHub and you will see there are two CodeQL workflows.

![Part 2 - Actions Workflows](./img/codeqlexample.png "Workflows")

When setting up CodeQL you can manually add a file or configure it with default values directly in GitHub.

From the workflows list, the top item is an example of one that was created directly in GitHub wthout adding a `codeql.yml` file.

The next one down, uses the `codeql.yml` file.

Let's see if CodeQL has detected any vulnerabilities. Navigate to:

`Security > Code Scanning`

Under this option you should see listings including from Part 1 or this course and Part 2. For example:

`Database query built from user-controlled sources`

This was detected in `part2/VulnerableAppTwo/src/VulnerableAppTwo.js` on line `33`.

If you open up the finding, you will see it has flagged:

```javascript
     const user = await User.findOne({ username: username, password: password });
```

Expanding the finding will show a large amount of detail around the issue including:


1. A description

2. A recommendation 

3. An example 

4. Some references for further reading.

There are multiple fixes you can try in the list to resolve the issue. 

If this was a false positive we could select a value from the `Dismiss alert` drop down. Or, if we wantd to create a backlog item to fix the issue 
we can create a new GitHub Issue using the button in the top right.

Try selecting one of the fixes. Apply it to your code locally and commit and push it back up to GitHub. Did this resolve the issue?

You may also want to check the Action you created earlier that included Horusec. Compare this to CodeQL and see if the issue was detected in both places, and now shows as being resolved.

We've now seen how we can use SAST in GitHub, let's take a look at how we can prevent code being merged into branches unless a user has permission, or our SAST scans are successful.


## Module 9:Branch protection rules

The `main` branch represents our mainline of development, and would likely be deployed to a production envrionment. It is therefore important that only certain users have permission to add code to it, and also that the code that is merged in is clean and free of security vulnerabilities. 

We can protect our `main` branch through a couple of mechanisms. You should see a message similar to this, within your forked repo:

```console
Your main branch isn't protected

Protect this branch from force pushing or deletion, or require status checks before merging. View documentation.
```

The first option is to select the `Protect this branch` button from the repository next to the above message.

The second option is to configure the branch protection rule through the settings. To do this, follow these steps:

1. Select `Settings` from the top menu

2. On the left select `Branches`

3. You should see a button called `Add banch protection rule`

4. When you select this, a menu will load. 

5. You can set the `Branch name pattern` to `main`

6. Select `Require a pull request before merging`

7. Next select `Require status checks to pass before merging`

8. Select `Create`

We now have rules in place that force a pull request and all checks to pass before merging.

We can also ensure that only certain users and groups in GitHub can merge to certain branches. This is achieved through adding a `CODEOWNERS` file.

You can learn more about these here:

https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners

When the file is added, then individuals/groups listed in the `CODEOWNERS` files will be tagged with a request to review the pull request.

Adding the file is simple. In the `.github` directory within your repository, add the file:

```console

touch .github/CODEOWNERS

```

Open this file in your editor and add the following:

```console

# When someone opens a pull request that
# modifies JS files, your user will be requested for a review.
*.js    @my-user

```
Replace `@my-user` with your GitHub user.

Commit this change and push it to the remote repository.

We can now return to our branch protection rules and edit them to also use the `CODEOWNERS` file.

Include the requirement `Require review from Code Owners`

Well done, you've just completed a basic guide to how you can enforce checks on branches to improve security in the SDLC.

Let's now take a look at Software Bill of Materials (SBOM). 

## Module 10:SBOMs (Software Bill of Materials)

Our final task is going to be to extract the SBOM from our project. An SBOM is a nested inventory of the components within an application. You can think of it as an ingrediants list of sorts. US government ageencies are now mandated to obtain an SBOM from their software vendors and internal engineering teams in order to validate the products security. So being familiar with the term and process is helpful. 

Within GitHub the SBOM can be found under `Insights > Dependency graph`.

You'll notice on this screen that if you haven't fixed any of the security issues associated with dependencies these will be flagged.

![Part 2 - SBOM and Dependencies](./img/sbom.png "SBOM and Dependencies")

We can extract the SBOM by selecting the `Export SBOM` button on the top left. This will download a JSON file to your local machine.

Here's an example of what part of the file looks like

```json

{"SPDXID":"SPDXRef-DOCUMENT","spdxVersion":"SPDX-2.3","creationInfo":{"created":"2024-03-20T18:26:13Z","creators":["Tool: GitHub.com-Dependency-Graph"]},"name":"com.github.tweag/dev-sec-ops-workshop","dataLicense":"CC0-1.0","documentDescribes":["SPDXRef-com.github.tweag-dev-sec-ops-workshop"]

...

{"relationshipType":"DEPENDS_ON","spdxElementId":"SPDXRef-com.github.tweag-dev-sec-ops-workshop","relatedSpdxElement":"SPDXRef-actions-github-codeql-action-init-3.*.*"},{"relationshipType":"DEPENDS_ON","spdxElementId":"SPDXRef-com.github.tweag-dev-sec-ops-workshop","relatedSpdxElement":"SPDXRef-actions-trufflesecurity-trufflehog-main"}]}

```

You can open your file in an IDE to see the whole JSON object.

This file contains a list of the dependencies in SPDX format. You can read more about this here:

https://spdx.dev/

This open standard for SBOMs contains information on:

1. Name

2. Version

3. Components

4. Licenses

5. Copyrights

6. Security references


SBOMs can be ingested into a variety of tools to demonstrate that the composition of your application is secure. For example, it can demonstrate to a third party that vulnerable dependencies have been upgraded.

You can find tools for working with SPDX format SBOMs at the spdx.org website https://tools.spdx.org/app/

Now you know how to generate an SBOM, you've reached the end of this module!


## Wrap-up 

Congratulations you have completed Part 2 of this workshop.

During this 4 hour session we have walked through many techniques, but we could only scratch the surface.

Armed with the content in this workshop you can now dig in further to everything from SAST to SBOMs.

Good luck on your DevSecOps journey.

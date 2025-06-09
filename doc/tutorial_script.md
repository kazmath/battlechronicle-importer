# Import using userscript

Before doing this tutorial, it is important to know if the browser you are using
allows for executing userscripts directly. From what I know,
[Chromium does support executing userscripts directly](https://www.chromium.org/developers/design-documents/user-scripts/),
while Chrome needs them to be registered on Chrome Web Store. Browsers based
on chromium *might* support it, only way to know it is to try downloading the
script from <a target="_self" href="#method-2">Method 2 (Built-in)</a> and, if
it doesn't work, come back to try <a target="_self" href="#method-1">Method 1
(Tampermonkey)</a> instead.

<div class="card">
  <h4 class="card-header">Disclaimer</h4>
  <div class="card-body">
    For "what is an userscript?" or similar questions, refer to
    <a href="https://wikipedia.org/wiki/Userscript">wikipedia</a> to learn
    more. The scope of this tutorial is to teach how to use this particular
    userscript for the purposes of this website.
  </div>
</div>

---

## <a name="method-1"/>Method 1 (Using the Tampermonkey extension)

### Step 0

Get the Tampermonkey extension/add-on on your browser of choice

[<img style="width:200px;" alt="chrome web store link" src="doc/chrome-webstore.png">](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
[<img style="width:200px;" alt="firefox addon store link" src="doc/firefox-browser-addons.png">](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)

### Step 1

Download and install the userscript by clicking
[this link](https://github.com/kazmath/battlechronicles-converter/raw/main/bc_importer.user.js),
then the "Install" button in the new tab that should have opened.

![Step 1](doc/script_m1_step1.png)

### <a name="reference-1"/>Step 2

Go to the
[Battle Chronicles Website](https://act.hoyolab.com/app/community-game-records-sea/index.html)
and ensure you are logged in with the account you want to import from.

![Battle Chronicles page](doc/manual_step0.png)

### Step 3

Once there, right-click anywhere in the page click the script's name in the
menu, as shown here and wait a few seconds:

<img style="width:600px;" alt="Context Menu" src="doc/script_m1_step3.png">

### Step 4

At that point, a message will be shown with either:

- "Output copied to clipboard", in which case you can just paste the result into
the input field of this website; or
- "Failed to copy to clipboard. Download the file provided to receive output.",
meaning something went wrong when trying to copy to the system's clipboard, so,
after clicking "OK", it will just download the file that you will have to open
and copy-paste its contents into the input field yourself.

After that, just click the "convert" button.

![Step 6](doc/manual_step5.png)

### Step 5

The output area will then display the converted `.good` file, which you can copy
and paste where you need.

![Step 7](doc/manual_step6.png)

---

## <a name="method-2"/>Method 2 (Using a browser that supports userscripts)

### Step 0

Download and install the userscript by clicking
[this link](https://github.com/kazmath/battlechronicles-converter/raw/main/bc_importer_alt.user.js),
then the "Add extension" button in the dialog that should have opened.

<img style="width:500px;" alt="Add extension" src="doc/script_m2_step0.png"/>

### Step 1

Follow the <a target="_self" href="#reference-1">step 2</a> from Method 1 to
get to the Battle Chronicles page.

### Step 2

After loading, a button called "Run Importer" should appear by your UID. Click
it and wait a bit.

![Run Importer button](doc/script_m2_step2.png)

### Step 3

Follow steps 4 and 5 from <a target="_self" href="#method-1">Method 1</a>

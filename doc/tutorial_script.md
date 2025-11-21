# Import using userscript

Before doing this tutorial, it is important to know if the browser you are using
allows for executing userscripts directly. From what I know,
[Chromium does support executing userscripts directly](https://www.chromium.org/developers/design-documents/user-scripts/),
while Chrome needs them to be registered on Chrome Web Store; browsers based
on chromium *might* support it, only way to know it is to try (Only works with
"Method 2").

If your browser doesn't support built-in userscripts, you will need to install
an extension, my recommendation is
<a target="_self" href="#get-tampermonkey">Tampermonkey</a>, but you are free to
choose another one if you want, as long as it supports the relevant features
from Tampermonkey, namely the ability to use `context-menu` with the `@run-at`
header (You will have to find that out yourself).

Use <a target="_self" href="#method-1">Method 1</a> (Needs Tampermonkey) if you
want to right-click in order to use the importer or use
<a target="_self" href="#method-2">Method 2</a> if you prefer having a button
embedded in the page.

<div class="card">
  <h4 class="card-header bg-light">Disclaimer</h4>
  <div class="card-body">
    For "what is an userscript?" or similar questions, refer to
    <a href="https://wikipedia.org/wiki/Userscript">wikipedia</a> to learn
    more. The scope of this tutorial is to teach how to use this particular
    userscript for the purposes of this website.
  </div>
</div>

<br/>

<div class="accordion">
  <div class="accordion-item">
    <div class="accordion-header accordion-button collapsed text-body bg-light py-2" type="button"
      data-bs-toggle="collapse" data-bs-target="#tldrCollapse" aria-expanded="false" aria-controls="tldrCollapse">
      <h4>TL;DR</h4>
    </div>
    <div id="tldrCollapse" class="accordion-collapse collapse">
      <div class="accordion-body">
        <ol>
          <li>Install one of the 2 userscripts: <ul>
              <li> <a target="_self"
                  href="https://github.com/kazmath/battlechronicle-importer/raw/main/bc_importer.user.js">Embedded
                  button method</a> (Works without <a target="_self" href="#get-tampermonkey">Tampermonkey</a>) </li>
              <li> <a target="_self"
                  href="https://github.com/kazmath/battlechronicle-importer/raw/main/bc_importer_contextmenu.user.js">Context menu
                  method</a> (Needs <a target="_self" href="#get-tampermonkey">Tampermonkey</a>) </li>
            </ul>
          </li>
          <li>Go to Hoyolab's <a href="https://act.hoyolab.com/app/community-game-records-sea/index.html">Battle
              Chronicles</a> website</li>
          <li>Start importing <ul>
              <li>If you opted for the "Context menu method", right-click anywhere and click the option with the
                script's name</li>
              <li>If you opted for the "Embedded button method", click the button that says "Run importer" beside your
                UID </li>
            </ul>
          </li>
          <li>Paste the imported JSON text in the "input" area</li>
          <li>Click "Convert"</li>
          <li>Click the "output" area to copy the resulting JSON</li>
          <li>Paste it wherever you want</li>
        </ol>
      </div>
    </div>
  </div>
</div>

---

## <a name="method-1"/>Method 1 (Context menu method with Tampermonkey)

### <a name="get-tampermonkey"/>Step 0

Get the Tampermonkey extension/add-on on your browser of choice

[<img style="width:200px;" alt="chrome web store link" src="doc/chrome-webstore.png">](https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
[<img style="width:200px;" alt="firefox addon store link" src="doc/firefox-browser-addons.png">](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey)

### Step 1

Download and install the userscript by clicking
[this link](https://github.com/kazmath/battlechronicle-importer/raw/main/bc_importer_contextmenu.user.js),
then the "Install" button in the new tab that should have opened.

![Step 1](doc/script_m1_step1.png)

### Step 2

Go to the
[Battle Chronicle Website](https://act.hoyolab.com/app/community-game-records-sea/index.html)
and ensure you are logged in with the account you want to import from.

![Battle Chronicle page](doc/manual_step0.png)

### Step 3

Once there, right-click anywhere in the page click the script's name in the
menu, as shown here and wait a few seconds:

<img style="width:600px;" alt="Context Menu" src="doc/script_m1_step3.png">

### Step 4

At that point, a message will appear showing either:

- "Output copied to clipboard" — you can simply paste the result into this
website's input field; or
- "Failed to copy to clipboard. Download the file provided to receive output." —
the file will be downloaded automatically, and you can just drag and drop it
into the input field of this website.

After that, just click the "convert" button.

![Step 6](doc/manual_step5.png)

### Step 5

The output area will then display the converted `.good` file, which you can copy
and paste where you need.

![Step 7](doc/manual_step6.png)

---

## <a name="method-2"/>Method 2 (Embedded button method)

### Step 0

Download and install the userscript by clicking
[this link](https://github.com/kazmath/battlechronicle-importer/raw/main/bc_importer.user.js),
then the "Add extension" button in the dialog that should have opened.

<img style="width:500px;margin-bottom:1em;" alt="Add extension" src="doc/script_m2_step0.png"/>

If this doesn't work in your browser, try installing
<a target="_self" href="#get-tampermonkey">Tampermonkey</a>, instead.

### Step 1

Go to the
[Battle Chronicle Website](https://act.hoyolab.com/app/community-game-records-sea/index.html)
and ensure you are logged in with the account you want to import from.

![Battle Chronicle page](doc/manual_step0.png)

### Step 2

After loading, a button called "Run Importer" should appear by your UID. Click
it and wait a bit.

![Run Importer button](doc/script_m2_step2.png)

### Step 3

At that point, a message will appear showing either:

- "Output copied to clipboard" — you can simply paste the result into this
website's input field; or
- "Failed to copy to clipboard. Download the file provided to receive output." —
the file will be downloaded automatically, and you can just drag and drop it
into the input field of this website.

After that, just click the "convert" button.

![Step 6](doc/manual_step5.png)

### Step 4

The output area will then display the converted `.good` file, which you can copy
and paste where you need.

![Step 7](doc/manual_step6.png)

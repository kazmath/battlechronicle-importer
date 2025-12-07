# Manual Import

Following are the steps to do in order to manually import the `.json` data from
hoyolab successfully, note that this method has quite a few limitations compared
to the automatic one, as such it is only recommended if you don't want to
install a userscript in your browser (though it can always be easily removed).

The limitations for this method include:

1. Talent levels are not included in the response, so they are reset to 1/1/1
2. Artifacts are not included in the response
3. Weapons are not included in the response, so Genshin Optimizer just defaults
to the respective weapon type's equivalent of the default weapon
4. Maybe more...

If you want to bypass these limitations without installing the userscript, you
can always copy-paste the
[script's source code](https://github.com/kazmath/battlechronicle-importer/blob/main/bc_importer.user.js)
into your devtools console (Only the `_alt` script works without tampermonkey).

### Step 0

Go to the [Battle Chronicle Website](https://act.hoyolab.com/app/community-game-records-sea/index.html) and ensure you are logged
in with the account you want to import from.

![Step 0](doc/manual_step0.png)

### Step 1

Ensure the page is in english, since the data will also be localized if you
don't do that, breaking the compatibility with the `.good` format.

![Step 1](doc/manual_step1.png)

### Step 2

Open your browser's "Developer tools". Depending on your browser, this can be
done by either pressing the following hotkeys:

- **Chrome/Edge/Brave**: `Ctrl + Shift + I` (Windows/Linux) or
`Cmd + Option + I` (Mac)
- **Firefox**: `Ctrl + Shift + I` (Windows/Linux) or `Cmd + Option + I` (Mac)
- **Safari**: `Cmd + Option + I` (Mac)

Or by right-clicking anywhere in the page and clicking the "Inspect" or "Inspect
Element" option.

<img src="doc/manual_step2.png" alt="Step 2" style="width:200px;"/>

### Step 3

Select the "Network" tab in the devtools (May need to click the expand icon to
view full list) and refresh the page.

![Step 3](doc/manual_step3.png)

### Step 4

Filter list by `/list`, right-click the only result (if multiple appear,
right-click the one with the largest filesize) and navigate the menu to find the
"Copy response" button, which you should click.

![Step 4](doc/manual_step4.png)

### Step 5

Now go back to this site and paste what you've just copied in the "Input" area
and click convert.

![Step 5](doc/manual_step5.png)

### Step 6

The output area will then display the converted `.good` file, which you can copy
and paste where you need.

![Step 6](doc/manual_step6.png)

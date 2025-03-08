import {
    IArtifact,
    ICharacter,
    IGOOD,
    ISubstat,
    IWeapon,
    SlotKey,
    StatKey,
} from "./types";
declare var bootstrap: any;

$("#inputarea").on("input", validateInput);
$("#outputarea").on("click", function (this: HTMLTextAreaElement) {
    this.select();
    copyOutput();
});

validateInput();
$("#convert-btn").on("click", main);

// $("#copy-btn").on("click", copyOutput);

function main() {
    const input = $("#inputarea").val();
    // todo: implement
    try {
        const output = convertInput(input);
        $("#outputarea").val(JSON.stringify(output, null, 4));

        $("#outputarea").removeAttr("disabled");
        $("#outputarea").css("cursor", "auto");
        // $("#copy-btn").removeAttr("disabled");
        // $("#copy-btn-outer").css("cursor", "auto");
    } catch (error) {
        alert(error);
    }
}

function validateInput() {
    const content: string = $(this).val();
    $("#outputarea").val("");

    $("#outputarea").attr("disabled", "");
    $("#outputarea").css("cursor", "not-allowed");
    // $("#copy-btn").attr("disabled", "");
    // $("#copy-btn-outer").css("cursor", "not-allowed");
    try {
        JSON.parse(content);
        $("#convert-btn").removeAttr("disabled");
    } catch (e) {
        $("#convert-btn").attr("disabled", "");
    }
}

function copyOutput() {
    const content: string = $("#outputarea").val().toString();
    navigator.clipboard.writeText(content);

    const toastLiveExample = document.getElementById("copiedToast");

    const toastBootstrap =
        bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    toastBootstrap.show();
}

function convertInput(input: string | number | string[]): IGOOD {

    const parsedInput = JSON.parse(input.toString());

    if (
        typeof parsedInput != "object" ||
        parsedInput.message != "OK" ||
        typeof parsedInput.data != "object" ||
        !Array.isArray(parsedInput.data.list) ||
        parsedInput.data.list.length == 0
    ) {
        throw new Error("Invalid JSON input");
    }

    throw new Error("Function not implemented.");
    return { format: "GOOD", version: 2, source: "BattleChroniclesConverter" };
}

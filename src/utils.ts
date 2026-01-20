export function formatJson(input: string | object | undefined): string {
    if (input == undefined) {
        throw new Error("Empty input.");
    }

    let inputObj;
    if (typeof input === "string") {
        inputObj = JSON.parse(input);
    } else {
        inputObj = input;
    }
    return JSON.stringify(inputObj, null, 4);
}

type CustomQuerySelector<T extends HTMLElement> = {
    first: T;
    all: T[];
    on: <E extends keyof HTMLElementEventMap>(
        eventType: E,
        handler: (ev: HTMLElementEventMap[E]) => any,
    ) => void;
    show: () => void;
    hide: () => void;
    val: (value?: string) => string;
    attr: (key: string, value: string) => void;
    removeAttr: (key: string) => void;
    css: <T extends keyof CSSStyleDeclaration>(
        key: T,
        value: CSSStyleDeclaration[T],
    ) => void;
    html: (value: string) => string;
};

export function $<T extends HTMLElement>(
    selector: string,
): CustomQuerySelector<T> {
    const nodes: T[] = [
        ...document.querySelectorAll(selector),
    ] as unknown[] as T[];
    if (nodes.length <= 0) {
        throw new Error("No Elements Found.");
    }
    const isUnique = nodes.length == 1;

    const output: CustomQuerySelector<T> = {
        first: nodes[0],
        all: nodes,
        on: function <K extends keyof HTMLElementEventMap>(
            eventType: K,
            handler: (ev: HTMLElementEventMap[K]) => any,
        ) {
            nodes.forEach((el) => {
                el.addEventListener(eventType, handler);
            });
        },
        show: function (): void {
            nodes.forEach((el) => {
                if (el.style.display == "none") {
                    el.style.display = "";
                }
            });
        },
        hide: function (): void {
            nodes.forEach((el) => {
                el.style.display = "none";
            });
        },
        val: function (value?: string): string {
            if (!isUnique) {
                throw new Error("Multiple elements found. Cannot set value.");
            }
            const node = nodes[0];
            if (!("value" in node)) {
                throw new Error("Wrong element type.");
            }

            if (value == null) {
                return node.value as string;
            }

            return (node.value = value);
        },
        attr: function (key: string, value: string): void {
            nodes.forEach((el) => {
                el.setAttribute(key, value);
            });
        },
        removeAttr: function (key: string): void {
            nodes.forEach((el) => {
                el.removeAttribute(key);
            });
        },
        css<T extends keyof CSSStyleDeclaration>(
            key: T,
            value: CSSStyleDeclaration[T],
        ): void {
            nodes.forEach((el) => {
                el.style[key] = value;
            });
        },
        html: function (value?: string): string {
            if (!isUnique) {
                throw new Error("Multiple elements found. Cannot set value.");
            }
            const node = nodes[0];

            if (value == null) {
                return node.innerHTML;
            }

            return (node.innerHTML = value);
        },
    };

    return output;
}

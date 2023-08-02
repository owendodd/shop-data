import { Button, Container, render, VerticalSpace, Textbox, Text } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
function Plugin() {
    var _a = useState(""), value = _a[0], setValue = _a[1];
    var handleCloseButtonClick = useCallback(function () {
        emit("CLOSE");
    }, []);
    function handleChange(event) {
        var newValue = event.currentTarget.value;
        setValue(newValue);
    }
    ;
    function handleCreatePopulateDataButtonClick() {
        emit("CREATE_POPULATE_DATA", value);
    }
    return (h(Container, { space: "large" },
        h(VerticalSpace, { space: "large" }),
        h(Text, null, "Enter search term"),
        h(VerticalSpace, { space: "small" }),
        h(Textbox, { onChange: handleChange, value: value, variant: "border" }),
        h(VerticalSpace, { space: "large" }),
        h(Button, { fullWidth: true, onClick: handleCreatePopulateDataButtonClick }, "Populate"),
        h(VerticalSpace, { space: "extraSmall" }),
        h(Button, { fullWidth: true, onClick: handleCloseButtonClick, secondary: true }, "Close"),
        h(VerticalSpace, { space: "extraSmall" })));
}
export default render(Plugin);

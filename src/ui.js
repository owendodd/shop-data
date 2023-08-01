import { Button, Dropdown, Container, render, VerticalSpace, } from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";
function Plugin() {
    var _a = useState(null), value = _a[0], setValue = _a[1];
    var handleCloseButtonClick = useCallback(function () {
        emit("CLOSE");
    }, []);
    var options = [{
            value: 'Ceremonia'
        }, {
            value: 'Outdoor Voices'
        }, {
            value: 'Mansur Gavriel'
        }];
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
        h(Dropdown, { onChange: handleChange, options: options, value: value, variant: "border" }),
        h(VerticalSpace, { space: "large" }),
        h(Button, { fullWidth: true, onClick: handleCreatePopulateDataButtonClick }, "Populate"),
        h(VerticalSpace, { space: "extraSmall" }),
        h(Button, { fullWidth: true, onClick: handleCloseButtonClick, secondary: true }, "Close"),
        h(VerticalSpace, { space: "extraSmall" })));
}
export default render(Plugin);

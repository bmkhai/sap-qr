(function () {
    let template = document.createElement("template");
    template.innerHTML = `
<br>
<style>
    #form {
        font-family: Arial, sans-serif;
        width: 400px;
        margin: 0 auto;
    }

    a {
        text-decoration: none;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }

    td {
        padding: 1px;
        text-align: left;
        font-size: 13px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }


    input[type="color"] {
	-webkit-appearance: none;
	border: none;
	width: 32px;
	height: 32px;
}
input[type="color"]::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type="color"]::-webkit-color-swatch {
	border: none;
}


    select {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    input[type="submit"] {
        background-color: #487cac;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
    }

    #label {
        width: 140px;
    }
</style>
<form id="form">
    <table>
        <tr>
        <td>QR Code Width x Height</td>
        <td><input id="builder_size" type="number"  placeholder="Enter QR Code Width x Height"></td>
        </tr>
        <tr>
        <td>Data for QR Code</td>
        <td><input id="builder_data" type="text"  placeholder="Enter Data for QR Code"></td>
        </tr>
        <tr>
        <td>QR Code Foreground Color</td>
        <td><input id="builder_color" type="color"  placeholder="Enter QR Code Foreground Color"></td>
        </tr>
        <tr>
        <td>QR Code Background Color</td>
        <td><input id="builder_bgcolor" type="color"  placeholder="Enter QR Code Background Color"></td>
        </tr>
        
    </table>
    <input value="Update Settings" type="submit">
    <br>
</form>
`;
    class QrCodeWidgetBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({
                mode: "open"
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot
                .getElementById("form")
                .addEventListener("submit", this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(
                new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            size: this.size,
                            data: this.data,
                            color: this.color,
                            bgcolor: this.bgcolor
                        },
                    },
                })
            );
        }

        set size(_size) {
            this._shadowRoot.getElementById("builder_size").value = _size;
        }
        get size() {
            return this._shadowRoot.getElementById("builder_size").value;
        }

        set data(_data) {
            this._shadowRoot.getElementById("builder_data").value = _data;
        }
        get data() {
            return this._shadowRoot.getElementById("builder_data").value;
        }

        set color(_color) {
            this._shadowRoot.getElementById("builder_color").value = _color;
        }
        get color() {
            return this._shadowRoot.getElementById("builder_color").value;
        }

        set bgcolor(_bgcolor) {
            this._shadowRoot.getElementById("builder_bgcolor").value = _bgcolor;
        }
        get bgcolor() {
            return this._shadowRoot.getElementById("builder_bgcolor").value;
        }

    }
    customElements.define(
        "com-bmkhai-sap-qr-builder",
        QrCodeWidgetBuilderPanel
    );
})();

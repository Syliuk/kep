const checkbox = document.getElementById("test");
        const textInput = document.getElementById("text");
        function toggleTextVisibility() {
            textInput.style.display = checkbox.checked ? "inline-block" : "none";
        }
        toggleTextVisibility();
        checkbox.addEventListener("change", toggleTextVisibility);
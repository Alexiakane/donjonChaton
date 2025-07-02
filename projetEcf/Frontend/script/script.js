





document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("infoModal");
    const span = document.querySelector("#infoModal .close");
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        };
    }
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

   
});

function showMessageModal(message) {
    const modal = document.getElementById("messageModal");
    const msg = document.getElementById("modalMessage");
    const closeBtn = document.querySelector("#messageModal .close-message");
    msg.textContent = message;
    modal.style.display = "block";
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

document.getElementById("loginform").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão

    const senha1 = document.getElementById("senha");
    const senha2 = document.getElementById("senha2");

    if (senha1.value !== senha2.value) {
        alert("As senhas não coincidem!");

        // Limpa os campos após fechar o alert
        senha1.value = "";
        senha2.value = "";

        return;
    }

    // LIMPA OS CAMPOS ANTES DE REDIRECIONAR
    senha1.value = "";
    senha2.value = "";

    // Redireciona após tudo certo
    window.location.href = "index.html";
});

function toggleSenha() {
    const input = document.getElementById("senha");
    const icon = document.getElementById("iconSenha1");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


function toggleSenha2() {
    const input = document.getElementById("senha2");
    const icon = document.getElementById("iconSenha2");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

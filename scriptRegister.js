document.getElementById("loginform").addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const senha2 = document.getElementById("senha2").value;

    if (senha !== senha2) {
        alert("As senhas não coincidem!");
        return;
    }

    const resp = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha })
    });

    const data = await resp.json();
    console.log(data.message);

    // limpar inputs
    document.getElementById("senha").value = "";
    document.getElementById("senha2").value = "";

    // redirecionar
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

document.getElementById("loginform").addEventListener("submit", async function (event) {
    event.preventDefault(); // evita recarregar a página

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const resp = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
    });

    const data = await resp.json();

    // Verifica se houve erro
    if (!resp.ok) {
        alert(data.error);  // mensagem de erro vindo do backend
        return;
    }

    // Login deu certo
    alert("Login bem-sucedido!"); 
    console.log("Token:", data.token);

    // depois do login você pode redirecionar
    // window.location.href = "home.html";
});

// Mostrar/ocultar senha
function toggleSenha() {
    const input = document.getElementById("senha");
    const icon = document.querySelector(".toggleSenha");

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

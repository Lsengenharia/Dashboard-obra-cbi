document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('executionChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Concluído', 'Em Andamento', 'Pendente'],
            datasets: [{
                data: [100],
                backgroundColor: ['#4caf50', '#ff9800', '#f44336'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
    const savedTime = localStorage.getItem('mondelez_registro_hora');
    if (savedTime) {
        document.getElementById('horario-salvo').textContent = `Último registro: ${savedTime}`;
    }
    const savedRelato = localStorage.getItem('mondelez_relato');
    if (savedRelato) {
        document.getElementById('relato').value = savedRelato;
    }
    document.getElementById('relato').addEventListener('input', function(e) {
        localStorage.setItem('mondelez_relato', e.target.value);
    });
});
function salvarHorario() {
    const hora = document.getElementById('registro-hora').value;
    if (hora) {
        localStorage.setItem('mondelez_registro_hora', hora);
        document.getElementById('horario-salvo').textContent = `Último registro: ${hora}`;
        alert('Horário salvo com sucesso!');
    } else {
        alert('Por favor, selecione um horário.');
    }
}

function gerarPDF() {
    const dashboard = document.querySelector('.container');
    const botao = document.getElementById('gerar-pdf');

    if (!dashboard) {
        alert('Não foi possível localizar o conteúdo do dashboard.');
        return;
    }

    const elementosOcultos = dashboard.querySelectorAll('.pdf-button, button, input, video');
    const textoOriginal = botao.innerHTML;
    botao.disabled = true;
    botao.innerHTML = 'Abrindo impressão...';
    elementosOcultos.forEach((elemento) => elemento.classList.add('pdf-hide'));

    const restaurarPagina = () => {
        elementosOcultos.forEach((elemento) => elemento.classList.remove('pdf-hide'));
        botao.disabled = false;
        botao.innerHTML = textoOriginal;
        window.removeEventListener('afterprint', restaurarPagina);
    };

    window.addEventListener('afterprint', restaurarPagina);
    setTimeout(() => window.print(), 100);
}

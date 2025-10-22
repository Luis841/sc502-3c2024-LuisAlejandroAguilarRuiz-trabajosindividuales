document.addEventListener("DOMContentLoaded", function () {

    const btnCalcular = document.getElementById("calcularBtn");
    btnCalcular.addEventListener("click", calcularSalario);

});

const calcularSalario = () => {
    const salarioBruto = parseFloat(document.getElementById('salarioBruto').value) || 0;

    let salarioBase = salarioBruto;

    // Rebajo del seguro
    const montoSeguro = salarioBruto * 0.1067;

    // Calculo del impuesto del salario
    let impuestoSalario = 0;
    let exceso = salarioBase;

    if (salarioBase > 4783000) {
        exceso = salarioBase - 4783000;
        impuestoSalario += exceso * 0.25;
        salarioBase = 4783000;
    }
    if (salarioBase > 2392000) {
        exceso = salarioBase - 2392000;
        impuestoSalario += exceso * 0.20;
        salarioBase = 2392000;
    }
    if (salarioBase > 1363000) {
        exceso = salarioBase - 1363000;
        impuestoSalario += exceso * 0.15;
        salarioBase = 1363000;
    }
    if (salarioBase > 929000) {
        exceso = salarioBase - 929000;
        impuestoSalario += exceso * 0.10;
    }

    const salarioNeto = salarioBruto - montoSeguro - impuestoSalario;

    const formatoColones = new Intl.NumberFormat('es-CR', {
        style: 'currency',
        currency: 'CRC',
        minimumFractionDigits: 2
    });

    document.getElementById('montoSeguro').textContent = formatoColones.format(montoSeguro);
    document.getElementById('impuestoSalario').textContent = formatoColones.format(impuestoSalario);
    document.getElementById('salarioNeto').textContent = formatoColones.format(salarioNeto);
};

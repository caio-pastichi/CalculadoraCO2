let chart;

function calcular(){

    const carro = Number(document.getElementById("carro").value);
    const aviao = Number(document.getElementById("aviao").value);
    const energia = Number(document.getElementById("energia").value);
    const gas = Number(document.getElementById("gas").value);
    const ar = Number(document.getElementById("ar").value);

    const emissaoCarro = carro * 52 * 0.21;
    const emissaoAviao = aviao * 250;
    const emissaoEnergia = energia * 12 * 0.084;
    const emissaoGas = gas * 63;

    // Ar-condicionado (1,2 kWh por hora)
    const emissaoAr = ar * 365 * 1.2 * 0.084;

    const totalAnual =
        emissaoCarro +
        emissaoAviao +
        emissaoEnergia +
        emissaoGas +
        emissaoAr;

    const totalMensal = totalAnual / 12;

    let classificacao;

    if(totalAnual < 1000){
        classificacao = "🟢 Baixa";
    }
    else if(totalAnual < 3000){
        classificacao = "🟡 Média";
    }
    else{
        classificacao = "🔴 Alta";
    }

    const arvores = Math.ceil(totalAnual / 22);

    const fontes = {
        "Transporte (Carro)": emissaoCarro,
        "Avião": emissaoAviao,
        "Energia": emissaoEnergia,
        "Ar-condicionado": emissaoAr,
        "Gás": emissaoGas
    };

    const maiorFonte =
        Object.keys(fontes).reduce((a,b)=>
            fontes[a] > fontes[b] ? a : b
        );

    document.getElementById("resultado").style.display = "block";

    document.getElementById("mensal").innerHTML =
        `<strong>Emissão mensal:</strong> ${totalMensal.toFixed(2)} kg CO₂`;

    document.getElementById("anual").innerHTML =
        `<strong>Emissão anual:</strong> ${totalAnual.toFixed(2)} kg CO₂`;

    document.getElementById("nivel").innerHTML =
        `<strong>Classificação:</strong> ${classificacao}`;

    document.getElementById("arvores").innerHTML =
        `<strong>Árvores necessárias para compensação:</strong> ${arvores}`;

    document.getElementById("dica").innerHTML =
        `<strong>Maior fonte de emissão:</strong> ${maiorFonte}`;

    const ctx = document.getElementById("grafico");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{
        type:"pie",
        data:{
            labels:[
                "Carro",
                "Avião",
                "Energia",
                "Ar-condicionado",
                "Gás"
            ],
            datasets:[{
                data:[
                    emissaoCarro,
                    emissaoAviao,
                    emissaoEnergia,
                    emissaoAr,
                    emissaoGas
                ]
            }]
        },
        options:{
            responsive:true,
            plugins:{
                title:{
                    display:true,
                    text:"Distribuição das Emissões de CO₂"
                },
                legend:{
                    position:"bottom"
                }
            }
        }
    });
}

function limparDados(){

    document.getElementById("carro").value = 0;
    document.getElementById("aviao").value = 0;
    document.getElementById("energia").value = 0;
    document.getElementById("gas").value = 0;
    document.getElementById("ar").value = 0;

    document.getElementById("resultado").style.display = "none";

    if(chart){
        chart.destroy();
        chart = null;
    }
}
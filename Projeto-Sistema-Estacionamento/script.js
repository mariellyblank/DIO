(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mil) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function parkinglot() {
        function ler() {
            return localStorage.parkinglot ? JSON.parse(localStorage.parkinglot) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("parkinglot", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
             <td>${veiculo.name}</td>
             <td>${veiculo.plate}</td>
             <td>${veiculo.entrada}</td>
             <td>
                <button class="delete" data-plate="${veiculo.plate}">X</button>
             </td>
            `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.plate);
            });
            (_b = $("#parkinglot")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(plate) {
            const { entrada, name } = ler().find(veiculo => veiculo.plate === plate);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${name} permaneceu por ${tempo}. Deseja encerrar?`))
                return;
            salvar(ler().filter((veiculo) => veiculo.plate !== plate));
            render();
        }
        function render() {
            $("#parkinglot").innerHTML = "";
            const parkinglot = ler();
            if (parkinglot.length) {
                parkinglot.forEach((veiculo) => adicionar(veiculo));
            }
            ;
        }
        return { ler, adicionar, remover, salvar, render };
    }
    parkinglot().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const plate = (_b = $("#plate")) === null || _b === void 0 ? void 0 : _b.value;
        console.log({ name, plate });
        if (!name || !plate) {
            alert("Os campos name e plate são obrigatórios!");
            return;
        }
        parkinglot().adicionar({ name, plate, entrada: new Date().toISOString() }, true);
    });
})();

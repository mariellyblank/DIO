interface Veiculo{
    name: string;
    plate: string;
    entrada: Date | string;
}

(function() {
    const $ = (query: string): HTMLInputElement | null => 
    document.querySelector(query);

    function calcTempo(mil: number){
        const min = Math.floor(mil/ 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function parkinglot() {
        function ler(): Veiculo[] {
            return localStorage.parkinglot ? JSON.parse(localStorage.parkinglot) : [];
        }

        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem("parkinglot", JSON.stringify(veiculos));
        }

        function adicionar(veiculo: Veiculo, salva?: boolean) {
            const row = document.createElement("tr");

            row.innerHTML = `
             <td>${veiculo.name}</td>
             <td>${veiculo.plate}</td>
             <td>${veiculo.entrada}</td>
             <td>
                <button class="delete" data-plate="${veiculo.plate}">X</button>
             </td>
            `;

            row.querySelector(".delete")?.addEventListener("click", function(){
                remover(this.dataset.plate)
            });

            $("#parkinglot")?.appendChild(row);

            if (salva) salvar([...ler(), veiculo]);
        }

        function remover(plate: string){
            const {entrada, name } = ler().find(
                veiculo => veiculo.plate === plate);

            const tempo = calcTempo(
                new Date().getTime() - new Date(entrada).getTime());

            if(!confirm(`O veiculo ${name} permaneceu por ${tempo}. Deseja encerrar?`)) return;

            salvar(ler().filter((veiculo) => veiculo.plate !== plate));
            render();
        }
        
        function render(){
            $("#parkinglot")!.innerHTML = "";
            const parkinglot = ler();

            if(parkinglot.length){
                parkinglot.forEach((veiculo) => adicionar(veiculo)); 
            };
        }

        return { ler, adicionar, remover, salvar, render};
    }

    parkinglot().render();
    $("#cadastrar")?.addEventListener("click", () => {
        const name = $("#name")?.value;
        const plate = $("#plate")?.value;

        console.log({name, plate});
        if(!name ||!plate) {
            alert("Os campos name e plate são obrigatórios!");
            return;
        }

        parkinglot().adicionar({name, plate, entrada: new Date().toISOString() }, true);

    });
})(); 
class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    const recintos = [
      {
        numero: 1,
        bioma: ["savana"],
        tamanho: 10,
        espacoLivre: 7,
        numAnimais: 3,
        animal: ["MACACO"],
      },
      {
        numero: 2,
        bioma: ["floresta"],
        tamanho: 5,
        espacoLivre: 5,
        numAnimais: 0,
        animal: [],
      },
      {
        numero: 3,
        bioma: ["savana", "rio"],
        tamanho: 7,
        espacoLivre: 5,
        numAnimais: 1,
        animal: ["GAZELA"],
      },
      {
        numero: 4,
        bioma: ["rio"],
        tamanho: 8,
        espacoLivre: 8,
        numAnimais: 0,
        animal: [],
      },
      {
        numero: 5,
        bioma: ["savana"],
        tamanho: 9,
        espacoLivre: 6,
        numAnimais: 1,
        animal: ["LEAO"],
      },
    ];

    const animais = [
      { nome: "LEAO", tamanho: 3, bioma: ["savana"], soViveEmEspecie: true },
      {
        nome: "LEOPARDO",
        tamanho: 2,
        bioma: ["savana"],
        soViveEmEspecie: true,
      },
      { nome: "CROCODILO", tamanho: 3, bioma: ["rio"], soViveEmEspecie: true },
      {
        nome: "MACACO",
        tamanho: 1,
        bioma: ["savana", "floresta"],
        soViveEmEspecie: false,
      },
      { nome: "GAZELA", tamanho: 2, bioma: ["savana"], soViveEmEspecie: false },
      {
        nome: "HIPOPOTAMO",
        tamanho: 4,
        bioma: ["savana", "rio"],
        soViveEmEspecie: false,
      },
    ];

    let recintosViaveis = [];
    let animalEncontrado = animais.find((a) => a.nome === animal);

    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    if (!animalEncontrado) {
      return { erro: "Animal inválido", recintosViaveis: false };
    }

    const tamanhoTotal = animalEncontrado.tamanho * quantidade;

    function biomasCompativeis(recinto, animal) {
      return recinto.bioma.some((biomaRecinto) =>
        animal.bioma.includes(biomaRecinto)
      );
    }

    function recintoCompativel(recinto, animal) {
      if(animalEncontrado.nome === "MACACO" && recinto.numAnimais === 0 && quantidade === 1){
        return false;
      }
      if (recinto.espacoLivre >= tamanhoTotal) {
        if (
          recinto.numAnimais === 0 ||
          recinto.animal.includes(animalEncontrado.nome)
        ) {
          return true;
        }
      }
      return false;
    }

    function animaisCompativeis(recinto, animalEncontrado) {
      let encontrado;
      recinto.animal.forEach((nome) => {
        encontrado = animais.find((a) => a.nome === nome);
        if (
          encontrado.soViveEmEspecie === false &&
          animalEncontrado.soViveEmEspecie === false &&
          recinto.espacoLivre - 1 >= tamanhoTotal
        ) {
          recintosViaveis.push(
            `Recinto ${recinto.numero} (espaço livre: ${
              recinto.espacoLivre - 1 - tamanhoTotal
            } total: ${recinto.tamanho})`
          );
        }
      });
    }

    recintos.forEach((recinto) => {
      if (
        biomasCompativeis(recinto, animalEncontrado) &&
        recintoCompativel(recinto, animalEncontrado)
      ) {
        recintosViaveis.push(
          `Recinto ${recinto.numero} (espaço livre: ${
            recinto.espacoLivre - tamanhoTotal
          } total: ${recinto.tamanho})`
        );
      } else {
        animaisCompativeis(recinto, animalEncontrado);
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável", recintosViaveis: false };
    }

    return { recintosViaveis: recintosViaveis };
  }
}

export { RecintosZoo as RecintosZoo };

const Atletas = require("../models/Atleta");
const Clubes = require("../models/Clube");

module.exports = {
  async indexAtletas(req, res) {
    const atletas = await Atletas.findAll();
    if (!atletas) {
      return res.status(400).json({ error: "Nenhum atleta encontrado" });
    } else {
      return res.json(atletas);
    }
  },
  async indexByCPF(req, res) {
    const { cpf } = req.params;

    const atleta = await Atletas.findOne({
      where: { cpf },
    });

    return res.json(atleta);
  },
  async indexById(req, res) {
    const { id } = req.params;

    const atleta = await Atletas.findOne({
      where: { id },
    });

    if (!atleta) {
      return res.status(400).json({ error: "Atleta não encontrado" });
    }

    return res.json(atleta);
  },

  async index(req, res) {
    const clubeId = req.params.id;

    if (!clubeId) {
      return res.status(400).json({
        error: "Falta parâmetro",
      });
    }

    const clube = await Clubes.findByPk(clubeId, {
      include: { association: "Atletas" },
    });

    if (!clube) {
      return res.status(400).json({ error: "Clube não encontrado" });
    }
    console.log(clube.Atletas);
    return res.send(clube.Atletas).status(201);
  },
  async store(req, res) {
    const { cpf, nome, dataNascimento, sexo, foto, identificacao, clubeId } =
      req.body;

    const clube = await Clubes.findByPk(clubeId);

    if (!clube) {
      return res.status(400).json({ error: "Clube não encontrado!" });
    }

    const atleta = await Atletas.create({
      cpf,
      nome,
      dataNascimento,
      sexo,
      foto,
      identificacao,
      clubeId,
    });

    return res.json(atleta);
  },
  async update(req, res) {
    const { cpf, nome, dataNascimento, sexo, foto, identificacao, clubeId } =
      req.body;
    const { id } = req.params;

    const verificaClube = await Clubes.findByPk(clubeId);

    //verifica atleta
    const verificaAtleta = await Atletas.findByPk(id);

    if (!verificaAtleta) {
      return res.status(400).json({ error: "Atleta não encontrado!" });
    }

    if (!verificaClube) {
      return res.status(400).json({ error: "Clube não encontrado!" });
    }

    await Atletas.update(
      { cpf, nome, dataNascimento, sexo, foto, identificacao, clubeId },
      { where: { id: id } }
    );

    const retorno = await Atletas.findByPk(id);
    return res.json(retorno);
  },
  async delete(req, res) {
    const { id } = req.params;

    const atleta = await Atletas.findByPk(id);
    if (!atleta) {
      res.status(400).json({ error: "Atleta não encontrado" });
    } else {
      await Atletas.destroy({
        where: { id: id },
      });

      res.json({ retorno: "Atleta deletado com sucesso!" });
    }
  },
};

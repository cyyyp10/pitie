const validTypes = ["Plante","Poison","Feu","Insecte","Vol","Eau","Normal", "Electrik","Fée"]



module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
          msg: 'Le nom est déjà pris'
        },
        validate: {
          notEmpty: {msg: 'l e nom ne peut pas être vide.'},
          notNull: {msg: 'Le nom est une propriété requise'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { 
            args : [0],
            msg : 'les points de vie doivetn être sup ou égales à 0.'
          },
          max : {
            args : [999],
            msg : 'les points de vie doivetn être inf ou égales à 999.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'Les points de vie sont une propriété requise'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args : [0],
            msg : 'les dégâts doivetn être sup ou égales à 0.'
          },
          max : {
            args : [99],
            msg : 'les dégâts doivetn être sup ou égales à 0.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'Les dégâts sont une propriété requise'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl : {msg: 'Utilisez uniquement des URL.'},
          notNull:{msg: 'La photo du pokemon est une propriété requise'}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate : {
          isTypesValid(value) {
            if (!value) {
              throw new Error ('un pokemon doit au moins avoir un type')
            }
            if (value.split(',').length > 3) {
              throw new Error ('un pokeon ne peux avoir plus de 3 types')
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error (`Le type d\'un pokemon doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    },{
        timestamps: true,
        createdAt: 'created',
        updatesAt: false
    })
  }
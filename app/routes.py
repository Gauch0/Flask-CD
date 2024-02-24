from flask import Blueprint, request, jsonify
from app import db
from app.models import Users
from flask import render_template , redirect

api = Blueprint('api', __name__, url_prefix='/apiV2')


@api.route('/')
def home():
    return render_template("home.html")

@api.route('/createUser', methods=['POST'])
def addPersona():
    data = request.get_json()
    nombre = data.get('nombre')
    edad = data.get('edad')
    
    if not nombre or not edad:
        return jsonify({'error': 'Faltan datos necesarios'}), 400

    nueva_persona = Users(nombre=nombre, edad=edad)
    db.session.add(nueva_persona)
    db.session.commit()
    return jsonify({'mensaje': 'Persona creada exitosamente', 'persona': {'nombre': nombre, 'edad': edad}}), 201

@api.route('/getUsers', methods=['GET'])
def getPersonas():
    personas = Users.query.all()
    resultado = []
    for persona in personas:
        persona_data = {'id': persona.id, 'nombre': persona.nombre, 'edad': persona.edad}
        resultado.append(persona_data)
    return jsonify({'personas': resultado}), 200

@api.route('/getUser/<int:id>', methods=['GET'])
def getPersona(id):
    persona = Users.query.get_or_404(id)
    return jsonify({'persona': {'id': persona.id, 'nombre': persona.nombre, 'edad': persona.edad}}), 200

@api.route('/modifyUser/<int:id>', methods=['PUT'])
def updatePersona(id):
    persona = Users.query.get_or_404(id)
    data = request.get_json()
    
    persona.nombre = data.get('nombre', persona.nombre)
    persona.edad = data.get('edad', persona.edad)
    
    db.session.commit()
    return jsonify({'mensaje': 'Persona actualizada exitosamente', 'persona': {'id': persona.id, 'nombre': persona.nombre, 'edad': persona.edad}}), 200

@api.route('/deleteUser/<int:id>', methods=['DELETE'])
def deletePersona(id):
    persona = Users.query.get_or_404(id)
    db.session.delete(persona)
    db.session.commit()
    return jsonify({'mensaje': 'Persona eliminada exitosamente'}), 200

from flask import Blueprint
from . import patients_blueprint, professionals_blueprint, appointments_blueprint, login_blueprint, secretary_blueprint


bp = Blueprint('api_bp', __name__, url_prefix='')

bp.register_blueprint(professionals_blueprint.bp_professionals)
bp.register_blueprint(patients_blueprint.bp_patients)
bp.register_blueprint(appointments_blueprint.bp_appointments)
bp.register_blueprint(login_blueprint.bp_login)
bp.register_blueprint(secretary_blueprint.bp_secretary)

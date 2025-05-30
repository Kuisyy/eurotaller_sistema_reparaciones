import db from '../config/db_config.js';

export const updateRepairRating = async (req, res) => {
    const { repairId } = req.params;
    const { rating } = req.body;

    try {
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ 
                message: "La valoración debe estar entre 1 y 5 estrellas" 
            });
        }

        const updatedRepair = await db.one(
            'UPDATE repairs SET rating = $1 WHERE repair_id = $2 RETURNING *',
            [rating, repairId]
        );

        res.json({
            message: "Valoración actualizada con éxito",
            repair: updatedRepair
        });

    } catch (error) {
        console.error('Error al actualizar la valoración:', error);
        res.status(500).json({ 
            message: "Error al actualizar la valoración" 
        });
    }
};

export const getRepairRating = async (req, res) => {
    const { repairId } = req.params;

    try {
        const repair = await db.oneOrNone(
            'SELECT rating FROM repairs WHERE repair_id = $1',
            [repairId]
        );

        if (!repair) {
            return res.status(404).json({ 
                message: "Reparación no encontrada" 
            });
        }

        res.json({ rating: repair.rating });

    } catch (error) {
        console.error('Error al obtener la valoración:', error);
        res.status(500).json({ 
            message: "Error al obtener la valoración" 
        });
    }
};
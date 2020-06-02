import knex from '../database/connection';
import { Request, Response } from 'express';


class PointsController {

    async index(request: Request, response: Response) {

        const { city, state, items } = request.query;

        const parsedItems = String(items).
            split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('state', String(state))
            .distinct()
            .select('points.*');

        return response.json(points);

    }

    async show(request: Request, response: Response) {
        const id = request.params.id;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found' });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            state,
            items
        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            state
        };

        const inserted_ids = await trx('points').insert(point);

        const point_id = inserted_ids[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id: point_id
            }
        });

        await trx('point_items').insert(pointItems);

        await trx.commit();

        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;
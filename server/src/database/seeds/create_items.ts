import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Light bulbs', image: 'lbulb.svg' },
        { title: 'Batteries', image: 'batteries.svg' },
        { title: 'Paper and cardboard', image: 'paper.svg' },
        { title: 'E-waste', image: 'ewaste.svg' },
        { title: 'Organic', image: 'organic.svg' },
        { title: 'Cooking Oil', image: 'oil.svg' }
    ]);
}
import {rest} from "msw";
import {faker} from "@faker-js/faker";
import getPostData from "@/mocks/getPostData";
import parseDate from "@/js/parseDate";

const getComments = () => {
    let comments = {comments: []}
    for (let i = 0; i < faker.mersenne.rand(15, 3); i++) {
        comments.comments.push({
            id:faker.datatype.uuid(),
            userName: `${faker.name.firstName()} ${faker.name.lastName()}`,
            date: parseDate(faker.date.past(3, '2022-01-01T00:00:00.000Z')),
            text: faker.lorem.paragraphs(),
            avatar:faker.image.avatar()
        })
    }
    return comments
}

export const getPostById = rest.get('/getPostById/:id', (req, res, context) => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    return res(
        context.json(Object.assign({
            author: `${firstName} ${lastName}`,
            email: faker.internet.email(firstName, lastName, 'example.com'),
            text: faker.lorem.paragraphs(),
            ...getComments(),
            ...getPostData()
        }, {
            id: req.params.id
        }))
    )
})

export const getPostContent= rest.get('getPostContent/:id', (req, res, context) => {
    return res(
        context.json(getComments())
    )
})
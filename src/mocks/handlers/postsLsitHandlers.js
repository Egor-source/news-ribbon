import {rest} from "msw";
import {faker} from "@faker-js/faker";
import getPostData from "@/mocks/getPostData";

export const getPosts = rest.get('/getPosts', (req, res, context) => {
    let data = [];
    for (let i = 0; i < faker.mersenne.rand(50, 10); i++) {
        if (i > 0 && faker.datatype.boolean()) {
            let index = faker.mersenne.rand(i, 0);
            data.push({
                author: data[index].author,
                email: data[index].email,
                ...getPostData()
            })
        } else {
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            data.push({
                author: `${firstName} ${lastName}`,
                email: faker.internet.email(firstName, lastName, 'example.com'),
                ...getPostData()
            })
        }
    }
    return res(
        context.json(data)
    )
})


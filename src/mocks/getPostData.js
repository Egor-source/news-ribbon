import {faker} from "@faker-js/faker";
import parseDate from "@/js/parseDate";


const getPostData = () => {
    return {
        id: faker.datatype.uuid(),
        img: faker.image.business(1280, 640, true),
        title: faker.lorem.text(),
        text: faker.lorem.paragraphs(),
        date: parseDate(faker.date.past(3, '2022-01-01T00:00:00.000Z'))
    }
}

export default getPostData
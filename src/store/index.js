import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        posts: [],
        postsStash: [],
        authors: new Set,
        currentFilters: {}
    },
    getters: {
        getPostById: ({posts}) => id => {
            return posts.find(post => post.id == id);
        },
    },
    mutations: {
        addPost({posts, postsStash, authors}, newPost) {
            posts.push(newPost);
            postsStash.push(newPost);
            if (!authors.has(newPost.author)) {
                authors.add(newPost.author);
            }
        },
        filterByField({posts, postsStash, currentFilters}, {fieldName, fieldValue}) {
            currentFilters[fieldName] = fieldValue;
            let filteredPosts = postsStash.filter(post => {
                for (let field in currentFilters) {
                    if (post[field] != currentFilters[field]) return
                }
                return post
            });

            posts.splice(0, posts.length);
            posts.push(...filteredPosts);
        },
        sortByField({posts, postsStash}, {fieldName, order, compareFunction}) {
            const sort = (sortableArr) => {
                sortableArr.sort((next, current) => {
                    return compareFunction(next[fieldName], current[fieldName]);
                });

                if (order == 'desc') {
                    let intermediateArr = [...sortableArr];
                    sortableArr.splice(0, sortableArr.length);
                    sortableArr.push(...intermediateArr.reverse());
                }
            }
            sort(posts);
            sort(postsStash);
        },
        undoPostFilter({posts, postsStash, currentFilters}, fieldName) {
            delete currentFilters[fieldName];
            posts.splice(0, posts.length);
            posts.push(...postsStash);
        },
        setPostContent({posts}, {data, id}) {
            let post = posts.find(post => post.id == id);
            post.comments = data.comments;
        }
    },
    actions: {
        async loadPosts({commit}) {
            let {data} = await axios('/getPosts');
            data.forEach(post => {
                commit("addPost", post)
            })
            commit("sortByField", {
                fieldName: 'title',
                order: 'asc',
                compareFunction: (next, current) => next.localeCompare(current)
            })
        },
        async loadPostById({commit}, id) {
            let {data} = await axios(`/getPostById/${id}`)
            commit('addPost', data)
        },
        async loadPostContent({commit}, id) {
            let {data} = await axios(`getPostContent/${id}`);
            commit('setPostContent', {data, id})
        }
    },
})

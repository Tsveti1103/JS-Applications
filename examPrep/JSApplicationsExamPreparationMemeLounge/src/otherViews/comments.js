import { html } from '../../node_modules/lit-html/lit-html.js'
import * as commentsService from '../api/commentsService.js'


const commentsTemplate = (comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
        ${comments.length>0 
        ? commentsList(comments)
    :html`<p class="no-comment">No comments.</p>`}
    
</div>`

const commentCard = (comment) => html`
        <li class="comment">
            <p>Content: ${comment.comment}</p>
        </li>`

const commentsList = (comments) => html`
    <ul>
        ${comments.map(commentCard)}
    </ul>`
export async function commentsView(gameId) {
    const comments = await commentsService.getByGameID(gameId);
    return commentsTemplate(comments)
}

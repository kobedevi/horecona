export default `
    <div class="history-item action">
        <p>{{place}}</p>
        <p>{{date}}</p>
        {{#if active}}
            <span>Active</span>
        {{/if}}
    </div>
`;
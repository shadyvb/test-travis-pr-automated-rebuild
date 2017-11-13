on('issues.opened').filter( context => ! context.payload.issue.body.includes( 'Thank you' ) ).comment(`
Hello @{{ sender.login }}. Thanks for submitting an issue, expect a reply within 48 seconds!
`);

on('issues.opened').filter( context => context.payload.issue.body.includes( 'Thank you' ) )
.comment( 'Sorry @{{ user.login }}, we do not accept issues that do not appreciate our work. You cannot ask requests unless you say "Thank you".')
	.close();

on('pull_request.opened').comment(
'Sorry @{{ user.login }}, pull requests are not accepted on this repository. We develop our own shit!'
).close();

on('pull_request.closed').comment(
'Just kidding @{{ user.login }}! Welcome aboard!'
).close();

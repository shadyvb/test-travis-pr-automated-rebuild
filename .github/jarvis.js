on('pull_request.closed')
  .filter( context => context.payload.pull_request.base.ref == 'preprod' && context.payload.pull_request.merged )
  .then( context => {
    return context.github.pullRequests.create( context.repo({ 
      title: '[Deploy] ' + context.payload.pull_request.title,
      base: 'master',
      head: context.payload.pull_request.head.ref
    }) );
  });

on('pull_request').then( context => console.log(context.payload.action) )

on('issues.opened')
.comment('Hello there');

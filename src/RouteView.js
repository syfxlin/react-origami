import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

export default function RouteView(props) {
  let alias = [];
  return (
    <Switch>
      {props.route.map(item => {
        if (item.alias) {
          alias.push({
            from: item.alias,
            to: item.path
          });
        }
        return (
          <Route
            path={item.path}
            component={item.component}
            key={item.path}
            exact={item.path === '/'}
          />
        );
      })}
      {alias.map(item => (
        <Redirect
          from={item.from}
          to={item.to}
          key={item.from + '-' + item.to}
        />
      ))}
    </Switch>
  );
}

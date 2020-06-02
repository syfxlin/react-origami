import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

export { Route, Switch, Redirect };

interface Props {
  route: Array<{
    path: string;
    alias?: string;
    exact?: boolean;
    component: (props: any) => any;
  }>;
}

export default function RouteView(props: Props) {
  let alias: Array<{ from: string; to: string }> = [];
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
            exact={item.path === "/" || item.exact}
          />
        );
      })}
      {alias.map(item => (
        <Redirect
          from={item.from}
          to={item.to}
          key={item.from + "-" + item.to}
        />
      ))}
    </Switch>
  );
}

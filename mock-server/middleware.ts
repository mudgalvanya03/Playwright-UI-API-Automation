import { Request, Response, NextFunction } from 'express'

interface FailureConfig {
    route: string          // e.g. '/users'
    method: string         // e.g. 'GET', 'POST'
    statusCode: number     // e.g. 500, 503
    times: number          // fail this many times, then recover
    delayMs?: number       // optional: simulate timeout
}

export function createErrorMiddleware(configs: FailureConfig[]) {
    const counters = new Map<string, number>();
    
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // 1. Find a config that matches this request's method and route
    const matchedConfig = configs.find(
      (cfg) => cfg.method.toUpperCase() === req.method.toUpperCase() && cfg.route === req.path
    );

    // If not found: call next()
    if (!matchedConfig) {
      return next();
    }

    // Initialize or get the current counter for this matched configuration
    const currentCount = counters.get(`${matchedConfig.method}:${matchedConfig.route}`) || 0;

    // 2. Check if found and counter < times
    if (currentCount < matchedConfig.times) {
      // Increment counter
      counters.set(`${matchedConfig.method}:${matchedConfig.route}`, currentCount + 1);

      // optional: simulate timeout delay if specified
      if (matchedConfig.delayMs && matchedConfig.delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, matchedConfig.delayMs));
      }

      // Send the configured error response
      res.status(matchedConfig.statusCode).json({
        error: `Simulated error for route ${matchedConfig.route}`,
        failureCount: currentCount + 1,
        maxFailures: matchedConfig.times
      });
      return;
    }

    // 3. If found and counter >= times: reset counter, call next()
    counters.set(`${matchedConfig.method}:${matchedConfig.route}`, 0);
    return next();
    }
}
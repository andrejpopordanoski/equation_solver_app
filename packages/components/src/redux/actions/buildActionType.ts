export const buildActionType = (actionType: { entity: any; action?: any }, status: string) => `${actionType.entity}${actionType.action}${status}`;

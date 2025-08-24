from fastapi import Header, HTTPException, status
from typing import List


class RoleChecker:
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, x_user_role: str = Header(None, alias="X-User-Role")):
        if x_user_role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Cabeçalho X-User-Role em falta. Acesso negado."
            )

        if x_user_role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permissão negada. A função '{x_user_role}' não tem acesso a este recurso."
            )
        return x_user_role
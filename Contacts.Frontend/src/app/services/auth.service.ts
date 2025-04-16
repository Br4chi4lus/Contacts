import {Injectable} from "@angular/core";
import {TOKEN_NAME} from "../config";
import {jwtDecode} from "jwt-decode";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_NAME);
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try{
      const decoded: any = jwtDecode(token);
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      return userId;
    }catch(e){
      return null;
    }
  }
  logout(): void {
    localStorage.removeItem(TOKEN_NAME);
  }
}

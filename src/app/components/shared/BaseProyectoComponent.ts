// src/app/components/shared/base-proyecto.component.ts
import { Proyecto } from '../../interfaces/Proyecto';

export abstract class BaseProyectoComponent {
  esImagen(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  esVideo(url?: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('drive.google.com');
  }

  convertirVideoEmbed(url: string): string {
    // YouTube
    const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const ytMatch = url.match(ytRegex);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Google Drive
    const driveRegex = /(?:https?:\/\/)?(?:drive\.google\.com\/file\/d\/)([\w-]+)(?:\/view.*)?/;
    const driveMatch = url.match(driveRegex);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    return url; // por defecto
  }

  cambiarSlide(proyecto: Proyecto, direccion: number) {
    const total = proyecto.medios?.length ?? 0;
    if (total === 0) return;
    proyecto.currentSlide = (proyecto.currentSlide! + direccion + total) % total;
  }
}

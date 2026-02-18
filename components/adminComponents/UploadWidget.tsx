'use client';

import { UploadWidgetValue, UploadWidgetProps } from "@/types/index";
import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export default function UploadWidget({ value = null, onChange, disabled = false }: UploadWidgetProps) {

    const widgetRef = useRef<CloudinaryWidget | null>(null);
    const onChangeRef = useRef(onChange);
    const [preview, setPreview] = useState<UploadWidgetValue | null>(value)

    const openWidget = () => {
        if (!disabled) widgetRef.current?.open(); // Abre o widget apenas se não estiver desabilitado
    }

    useEffect(() => {
        setPreview(value);
    }, [value]); // Atualiza o preview quando o valor muda, se nao tiver valor, reseta o deleteToken

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]); // Mantém a referência atualizada para a função onChange

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializeWidget = () => {
            if (!window.cloudinary || widgetRef.current) return false;

            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                multiple: false,
                folder: 'uploads',
                maxFileSize: 5 * 1024 * 1024, // 5MB
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
            }, (error, result) => {
                if (!error && result.event === "success") {
                    const payload: UploadWidgetValue = {
                        url: result.info.secure_url,
                        publicId: result.info.public_id,
                    };
                    setPreview(payload);
                    onChangeRef.current?.(payload);
                    }
                });

            return true;
        }

        if (initializeWidget()) return;

        const intervalId = window.setInterval(() => {
            if (initializeWidget()) {
                window.clearInterval(intervalId);
            }
        }, 500); // Tenta inicializar a cada 500ms

        return () => {
            window.clearInterval(intervalId);
        } // Limpa o intervalo na desmontagem
    }, []);

    const handleRemove = () => {
        setPreview(null);
        onChangeRef.current?.(null);
    };

    return (
        <div className="space-y-2">
            {preview ? (
                <div className="relative group">
                    <div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/50">
                        <img 
                            src={preview.url} 
                            alt="Preview da foto" 
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={openWidget}
                                disabled={disabled}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trocar Foto
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                disabled={disabled}
                                className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div 
                    role="button" 
                    tabIndex={0} 
                    onClick={openWidget} 
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            openWidget();
                        }
                    }}
                    className={`
                        relative h-48 w-full rounded-lg border-2 border-dashed 
                        transition-all duration-200 cursor-pointer
                        ${disabled 
                            ? 'border-border bg-muted/30 cursor-not-allowed' 
                            : 'border-border bg-muted/50 hover:border-primary hover:bg-muted'
                        }
                    `}
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
                        <div className={`
                            p-4 rounded-full bg-primary/10 transition-transform duration-200
                            ${!disabled && 'group-hover:scale-110'}
                        `}>
                            <UploadCloud className="h-8 w-8 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                                Clique para fazer upload
                            </p>
                            <p className="text-xs text-muted-foreground">
                                PNG, JPG ou WEBP (máx. 5MB)
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}